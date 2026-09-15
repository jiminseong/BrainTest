import questionsData from '../pages/test-content/model/question.json';
import questionTypeMapping from '../pages/test-content/model/questionMapping';

/**
 * 문항 수와 채점 매핑이 어긋나 있는 상태를 못 박아 둔다.
 *
 * 화면에는 39문항이 나오지만 questionMapping에는 1~38번만 있어서 마지막
 * 문항('욕구를 참기가 어렵다')은 점수에 반영되지 않는다. 의도인지 누락인지
 * 확인되지 않아 채점 로직은 건드리지 않았고, 대신 이 테스트로 현재 상태를
 * 고정해 둔다. 매핑이나 문항이 바뀌면 여기서 먼저 깨진다.
 */
describe('문항과 채점 매핑', () => {
    it('매핑은 1번부터 빠짐없이 이어진다', () => {
        const indices = questionTypeMapping.map((m) => m.questionIndex);
        expect(indices).toEqual(indices.map((_, i) => i + 1));
    });

    it('채점되는 문항 수는 매핑 수와 같다', () => {
        expect(questionTypeMapping.length).toBe(38);
    });

    it('마지막 문항은 화면에만 나오고 채점에는 쓰이지 않는다', () => {
        expect(questionsData.questions.length).toBe(questionTypeMapping.length + 1);
        expect(questionsData.questions.at(-1)).toBe('욕구를 참기가 어렵다.');
    });
});
