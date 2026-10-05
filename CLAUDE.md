# BrainTest — Claude 작업 규칙

React + TypeScript + Vite + styled-components. 뇌 유형 테스트 사이트(시각디자인 졸업작품 외주). 공개 저장소.

## 세션 시작 시

1. `_meeting/HANDOFF.md`를 먼저 읽는다. 중단된 작업과 다음 할 일이 거기 있다.
2. `_meeting/YYYY-MM-DD_작업내역.md` 최신 파일의 "남은 일"을 확인한다.
3. 클라이언트 피드백 원문은 `_meeting/피드백/`에 있다. 처리하면 체크 표시만 남기고 지우지 않는다.

## 절대 규칙

- `_meeting/`은 gitignore 대상이다. 클라이언트 이름·대화·피드백·일정은 **저장소 파일(CLAUDE.md, README, 커밋 메시지 포함)에 쓰지 않는다.** 공개 저장소다.
- UI·타이밍 수정은 **실제로 돌려보고 나서** 완료라고 말한다. 코드 추론만으로 "됐다"고 하지 않는다. 확인한 것과 추론만 한 것을 구분해서 보고한다.
- 로컬 변경은 "아직 배포 전"이라고 명시한다. 배포는 `main`에 머지돼야 일어난다.
- 머지(`gh pr merge`)는 사용자가 직접 한다. PR 생성까지만.

## 브랜치 / 배포

- 기본 브랜치 `develop`, 프로덕션 `main` (Vercel git 연동, Production Branch = main).
- 흐름: 작업 브랜치 → `develop` PR → `develop` → `main` PR → 자동 배포.
- 사이트 주소는 `.env.production`의 `VITE_SITE_URL` 한 곳에서 주입된다. 도메인 바뀌면 여기 + `public/sitemap.xml` + `public/robots.txt`.
- 카톡 미리보기(og-image) 바꾸면 배포 **확인 후** 카카오 공유 디버거에서 캐시 삭제.

## 검증 명령

```
npm run lint        # eslint
npx tsc --noEmit
npm run build       # tsc -b && vite build
npm test            # jest (questionMapping 고정 테스트 있음)
```

## 코드 메모

- 반응형 분기는 `@media (max-width: 1023px)`가 기준. `isMobile()`(`src/model/isMobile.ts`)은 UA 기반이라 데스크톱 창 줄이기로는 모바일 흐름이 안 돈다.
- 결과 페이지 이미지(`TypeNeuron`, `TypeStructure`)는 wrapper `width:100%` + img `height:auto`로 비율을 지킨다. flex 부모 안에서 `width: %`만 주면 비율이 깨진다.
- 문항은 `src/pages/test-content/model/question.json`, 채점은 `questionMapping.tsx`. 39번 문항은 매핑에 없어 채점에 안 쓰인다 (클라이언트 확인 대기).
- 폰트 `unicode-range`는 폰트 cmap 기준으로 만든다. 요청 글자 목록으로 만들면 없는 글자 때문에 전체 폰트를 또 받는다.

## 도구 메모

- Vercel MCP는 이 팀 권한이 없어 403. `vercel` CLI 사용.
- Figma MCP는 Starter 플랜이라 호출 한도가 있다. `get_metadata`로 구조 보고 필요한 노드만 `get_screenshot`/`get_design_context`.
- 로컬 앱 데이터·브라우저 방문기록 조회는 자동 모드가 차단한다. 링크는 사용자에게 받는다.
