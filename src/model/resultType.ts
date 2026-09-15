export const TOTAL_RESULT_TYPES = 16;

/**
 * URL 파라미터로 들어온 type이 실제 존재하는 유형(1~16)인지 검사한다.
 * 잘못된 값이면 유형별 이미지 동적 import가 실패해 빈 화면이 남는다.
 */
export const isValidResultType = (type: number): boolean =>
    Number.isInteger(type) && type >= 1 && type <= TOTAL_RESULT_TYPES;
