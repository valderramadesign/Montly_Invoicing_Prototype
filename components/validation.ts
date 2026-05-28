// Lightweight, forgiving validation for the monthly-invoicing prototype.
// The goal is to reject obvious gibberish (keyboard mashing, repeated chars,
// placeholder text) without demanding perfect real-world formatting.

const KEYBOARD_RUNS = [
  "qwerty",
  "qwertyuiop",
  "asdf",
  "asdfgh",
  "asdfghjkl",
  "zxcv",
  "zxcvbnm",
  "qazwsx",
  "qweqwe",
  "asdasd",
  "qweasd",
  "hjkl",
];

const PLACEHOLDER_WORDS = new Set([
  "test",
  "testing",
  "demo",
  "none",
  "na",
  "abc",
  "abcd",
  "xxx",
  "xxxx",
  "placeholder",
  "sample",
  "example",
  "dummy",
  "foo",
  "bar",
  "baz",
  "lorem",
  "ipsum",
  "tbd",
  "todo",
  "unknown",
  "asdf",
  "qwerty",
]);

function countByChar(s: string): Map<string, number> {
  const counts = new Map<string, number>();
  for (const ch of s) counts.set(ch, (counts.get(ch) ?? 0) + 1);
  return counts;
}

function maxRepeatRatio(s: string): number {
  if (!s) return 0;
  let max = 0;
  for (const n of countByChar(s).values()) max = Math.max(max, n);
  return max / s.length;
}

// True when the digit string is a clean ascending or descending run (1234, 9876…).
function isSequential(digits: string): boolean {
  if (digits.length < 4) return false;
  let asc = true;
  let desc = true;
  for (let i = 1; i < digits.length; i++) {
    const diff = digits.charCodeAt(i) - digits.charCodeAt(i - 1);
    if (diff !== 1) asc = false;
    if (diff !== -1) desc = false;
  }
  return asc || desc;
}

/**
 * Broad "does this look like junk" check used by the text-ish fields.
 * Flags empty/whitespace, symbol-only, placeholder words, keyboard runs,
 * and values dominated by a single repeated character.
 */
export function looksLikeGibberish(value: string): boolean {
  const v = value.trim();
  if (!v) return true;

  const lower = v.toLowerCase();
  const alnum = lower.replace(/[^a-z0-9]/g, "");

  // Nothing but symbols/punctuation.
  if (alnum.length === 0) return true;

  // Exact placeholder text ("test", "n/a", "abc"…).
  const collapsed = lower.replace(/\s+/g, " ").trim();
  if (PLACEHOLDER_WORDS.has(collapsed) || PLACEHOLDER_WORDS.has(alnum)) {
    return true;
  }

  // Keyboard mashing ("asdfasdf", "qwerty"…).
  for (const run of KEYBOARD_RUNS) {
    if (alnum.includes(run)) return true;
  }

  // A single repeated character ("xxxxx", "aaaa").
  if (/^(.)\1+$/.test(alnum)) return true;

  // Mostly one repeated character.
  if (alnum.length >= 4 && maxRepeatRatio(alnum) > 0.6) return true;

  // Almost no character variety in a longer string ("abababab").
  if (alnum.length >= 6 && new Set(alnum).size <= 2) return true;

  return false;
}

export function isUSCountry(country: string): boolean {
  const c = country.trim().toLowerCase().replace(/[^a-z]/g, "");
  return [
    "us",
    "usa",
    "unitedstates",
    "unitedstatesofamerica",
    "america",
  ].includes(c);
}

export function validateBusinessName(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter your legal business name.";
  if (v.length < 2) return "Enter a business name with at least 2 characters.";
  if (!/\p{L}/u.test(v)) return "Enter a business name that includes letters.";
  if (!/^[\p{L}\p{N}\s&'.,-]+$/u.test(v)) {
    return "Use only letters, numbers, spaces, and & ' . , -";
  }
  if (looksLikeGibberish(v)) {
    return "Enter a real-looking business name, not placeholder text.";
  }
  return null;
}

export function validateStreet1(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a street address.";
  if (!/\p{L}/u.test(v) || !/\d/.test(v)) {
    return "Enter a street address with a number and street name.";
  }
  if (!/^[\p{L}\p{N}\s.,#/-]+$/u.test(v)) {
    return "Use only letters, numbers, spaces, and . , # / -";
  }
  if (looksLikeGibberish(v)) return "Enter a real-looking street address.";
  return null;
}

export function validateStreet2(value: string): string | null {
  const v = value.trim();
  if (!v) return null; // optional
  if (v.length < 2 || !/[\p{L}\p{N}]/u.test(v)) {
    return "Enter a unit, suite, or floor — or leave it blank.";
  }
  if (looksLikeGibberish(v)) {
    return "Enter a real-looking address line, or leave it blank.";
  }
  return null;
}

export function validateCity(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a city.";
  if ((v.match(/\p{L}/gu) ?? []).length < 2) {
    return "Enter a city name with at least two letters.";
  }
  if (!/^[\p{L}\s.'-]+$/u.test(v)) {
    return "Use only letters, spaces, and . ' -";
  }
  if (looksLikeGibberish(v)) return "Enter a real-looking city name.";
  return null;
}

export function validateState(value: string, country: string): string | null {
  const v = value.trim();
  if (!v) {
    return isUSCountry(country)
      ? "Enter a state for United States addresses."
      : null;
  }
  if (!/\p{L}/u.test(v)) return "Enter a valid state name or abbreviation.";
  if (looksLikeGibberish(v)) {
    return "Enter a real-looking state name or abbreviation.";
  }
  return null;
}

export function validateZip(value: string, country: string): string | null {
  const v = value.trim();
  if (!v) {
    return isUSCountry(country)
      ? "Enter a ZIP code for United States addresses."
      : null;
  }

  if (isUSCountry(country)) {
    if (!/^\d{5}(-\d{4})?$/.test(v)) {
      return "Enter a ZIP code like 12345 or 12345-6789.";
    }
    const digits = v.replace(/\D/g, "");
    if (/^(\d)\1+$/.test(digits)) {
      return "Enter a real ZIP code, not repeated digits.";
    }
    return null;
  }

  // Non-US postal codes: loose length + character check.
  if (!/^[\p{L}\p{N}\s-]{3,12}$/u.test(v)) {
    return "Enter a postal code of 3 to 12 letters or numbers.";
  }
  const compact = v.replace(/[^\p{L}\p{N}]/gu, "");
  if (compact && /^(.)\1+$/.test(compact)) {
    return "Enter a real postal code, not repeated characters.";
  }
  return null;
}

export function validateCountry(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a country.";
  if ((v.match(/\p{L}/gu) ?? []).length < 2) {
    return "Enter a country name or abbreviation.";
  }
  if (!/^[\p{L}\s.'-]+$/u.test(v)) {
    return "Use only letters, spaces, and . ' -";
  }
  if (looksLikeGibberish(v)) {
    return "Enter a real country name or abbreviation.";
  }
  return null;
}

export function validatePhone(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a business phone number.";
  if (!/^[\d\s().+-]+$/.test(v)) {
    return "Enter a phone number using only digits and ( ) + . -";
  }
  const digits = v.replace(/\D/g, "");
  if (digits.length < 7 || digits.length > 15) {
    return "Enter a phone number with 7 to 15 digits.";
  }
  if (/^(\d)\1+$/.test(digits) || maxRepeatRatio(digits) > 0.7) {
    return "Enter a real phone number, not repeated digits.";
  }
  return null;
}

export function validateEmail(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a business email.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) {
    return "Enter an email like name@business.com.";
  }
  const [local, domain] = v.toLowerCase().split("@");
  const domainName = domain.split(".")[0];
  if (local === domainName || PLACEHOLDER_WORDS.has(local) || local === "email") {
    return "Enter a real-looking email, not placeholder text.";
  }
  if (looksLikeGibberish(local)) {
    return "Enter a real-looking email address.";
  }
  return null;
}

export function validateTaxId(value: string): string | null {
  const v = value.trim();
  if (!v) return "Enter a tax ID number.";
  if (!/^[a-zA-Z0-9\s-]+$/.test(v)) {
    return "Use only letters, numbers, spaces, and hyphens.";
  }
  if (v.length < 5 || v.length > 20) {
    return "Enter a tax ID between 5 and 20 characters.";
  }

  const letters = v.toLowerCase().replace(/[^a-z]/g, "");
  if (PLACEHOLDER_WORDS.has(letters) || letters === "taxid") {
    return "Enter a real tax ID, not placeholder text.";
  }

  const digits = v.replace(/\D/g, "");
  if (digits.length < 4) {
    return "Enter a tax ID that includes at least 4 digits.";
  }
  if (/^(\d)\1+$/.test(digits)) {
    return "Enter a real tax ID, not repeated digits.";
  }

  // Reject bare sequential numbers (123456789) but allow formatted IDs
  // that merely contain a run (12-3456789, AB-1234567).
  const stripped = v.replace(/\s/g, "");
  if (/^\d+$/.test(stripped) && isSequential(stripped)) {
    return "Enter a real tax ID, not a sequential placeholder.";
  }
  return null;
}
