# BrainTest 에이전트 안내

이 저장소는 뇌 유형 테스트 사이트(React + TypeScript + Vite + styled-components)입니다.
이 파일은 AI 코딩 에이전트(Antigravity 등)가 사이트 주인을 대신해 **문구·이미지 수준의 수정**을 안전하게 하도록 돕는 규칙입니다.
사용자는 개발자가 아닐 수 있습니다. 전문 용어 대신 쉬운 말로, 한국어로 설명하세요.

## 자주 쓰는 작업 (슬래시 명령)

- `/fix-text` — 사이트 문구 바꾸기
- `/swap-image` — 이미지 교체하기
- `/publish` — 수정한 내용을 올려서 반영 요청하기 (PR 만들기)

## 어디에 뭐가 있나

| 바꾸고 싶은 것 | 파일 |
|---|---|
| 검사 문항 39개 | `src/pages/test-content/model/question.json` (`{{mobileBr}}`는 모바일 줄바꿈 표시, 그대로 둘 것) |
| 시작 화면 문구 | `src/pages/home/HomePage.tsx` |
| 주의사항 화면 문구 | `src/pages/caution/CautionPage.tsx` |
| 결과 분석 중 문구 | `src/pages/test-content/ui/ResultLoading.tsx` |
| 결과 페이지 문구 (유형 설명) | `src/pages/test-result/model/result.json` |
| 결과 페이지 문구 (유형 제목) | `src/pages/test-result/model/title.json` |
| 결과 유형 뉴런 그림 (16종) | `src/assets/images/typeNeuron/type{N}_neuron.webp` |
| 결과 유형 구조 그림 (16종) | `src/assets/images/typeStructure/type_{N}_word.webp` |
| 결과 유형 로고 (16종) | `src/assets/images/typeLogo/type_{N}_icon.webp` |
| 저장·인쇄용 결과지 (16종, 세로로 긴 454×1684) | `src/assets/images/typeResultPng/type_{N}_bill.webp` |
| 결과 애니메이션 조각 (svg) | `src/assets/images/typeGraphic/` |
| 카톡 공유 미리보기 | `public/og-image.jpg` |

`{N}`은 유형 번호 1~16입니다. 이미지는 **파일명을 그대로 두고 내용만 바꾸는** 방식으로 교체합니다. 코드가 파일명으로 이미지를 찾기 때문입니다.

## 건드리지 않는 것

- `src/pages/test-content/model/questionMapping.tsx`, `calculateResultType.tsx`, `determineComplexType.tsx` — 채점 규칙. 문구를 바꿔도 여기는 수정하지 않습니다.
- `question.json`의 문항 **개수와 순서** — 바꾸면 채점이 틀어집니다. 문장만 고칩니다.
- `.env.production`, `vercel.json`, `public/sitemap.xml`, `public/robots.txt` — 배포·주소 설정.
- `_meeting/` — 있으면 무시합니다. 읽지도, 커밋하지도 않습니다.

## 작업 규칙

1. **`main`·`develop`에서 직접 수정하지 않습니다.** 작업 시작 전 항상 `develop`에서 새 브랜치를 만듭니다. 이름은 `edit/날짜-내용` (예: `edit/1113-question-17`).
2. 수정 후 **반드시 `npm run build`가 통과**해야 합니다. 실패하면 원인을 쉬운 말로 설명하고 고친 뒤 다시 확인합니다.
3. 화면에 보이는 변경은 `npm run dev`로 띄우고 **브라우저로 결과를 직접 보여줍니다.** 코드만 보고 "됐다"고 하지 않습니다.
4. 반영은 `/publish`로 PR을 만들어 요청합니다. **머지는 사이트 주인이 합니다.** 에이전트가 머지하지 않습니다.
5. 한 번에 한 가지 변경만 합니다. 요청하지 않은 파일은 건드리지 않습니다.
6. 사용자에게 보고할 때는 "무엇을, 어느 파일에서, 어떻게 바꿨는지"를 한두 문장으로 말하고, 확인한 것과 추측한 것을 구분합니다.

## 참고

- PR을 올리면 Vercel 미리보기 검사가 **실패로 표시될 수 있습니다.** 무료 플랜 제약으로 사이트 주인 외의 커밋은 미리보기가 만들어지지 않기 때문이며, 수정 내용의 문제가 아닙니다. 머지되면 정상 배포됩니다.
- 반응형 분기 기준은 `@media (max-width: 1023px)`입니다.
- 검증 명령: `npm run lint`, `npx tsc --noEmit`, `npm run build`, `npm test`
