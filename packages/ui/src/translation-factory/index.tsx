import type { VFC } from "react";

type BaseDictionary = Record<string, Record<string, string>>;

export const translationFactory =
  <T extends BaseDictionary>(
    dictionary: T,
    getLanguageCode: () => keyof T[keyof T],
    fallbackText = "MISSING_TRANSLATION",
  ): VFC<
    Partial<Record<keyof T, boolean>> & {
      k?: keyof T;
      r?: Record<string, string>;
    }
  > =>
  // eslint-disable-next-line react/display-name
  ({ k, r = {}, ...props }) => {
    const languageCode = getLanguageCode();
    const key = (k as keyof T) || (Object.keys(props)[0] as keyof T);
    return <>{replace(dictionary, languageCode, fallbackText, key, r)}</>;
  };

export const translationFunctionFactory =
  <T extends Record<string, Record<string, string>>>(
    dictionary: T,
    getLanguageCode: () => keyof T[keyof T],
    fallbackText?: string,
  ): ((k: keyof T, r?: Record<string, string>, overrideLanguage?: keyof T[keyof T]) => string) =>
  (k, r = {}, overrideLanguage) => {
    const languageCode = overrideLanguage || getLanguageCode();
    return replace(dictionary, languageCode, fallbackText, k, r);
  };

const replace = <T extends BaseDictionary>(
  dictionary: T,
  languageCode: keyof T[keyof T],
  fallbackText = "MISSING_TRANSLATION",
  k: keyof T,
  r: Record<string, string> = {},
) => {
  const key = k;
  let value = dictionary[key]?.[languageCode] || fallbackText;
  Object.keys(r).forEach((rKey: keyof typeof r) => {
    value = value.replace(RegExp(`${rKey}`), r[rKey]);
  });
  return value;
};
