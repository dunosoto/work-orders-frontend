export enum ConstanstEnum {
  PATTERN_ONLY_TEXT = '^[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1 ]+$',
  PATTERN_ONLY_TEXT_NUMBER = '[A-Za-z0-9]*',
  DATE_FORMATE = 'YYYY-MM-DD HH:mm:ss',
  PATTERN_PHONE = '^[6-7,4,5]+[0-9]+$',
  PATTERN_ONLY_NUMBER = '^-?[0-9]\\d*(\\.\\d{1,2})?$',
  PATTERN_ONLY_POSITIVE_NUMBER = '^([0-9]+\\d*)|[0]',
  PATTERN_DATE_FORMAT = 'YYYY-DD-MM HH:mm:ss',
  PATTERN_DATE_TO_QUERY = 'YYYY-MM-DD',
}
