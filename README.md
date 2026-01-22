# Tilda Dashboard Assignment
**🔗 [배포 링크 바로가기](https://assignment-hongsumin.vercel.app)**

---
## 📊 대시보드 (/)
> **Recharts** 라이브러리와 공공데이터 API를 활용한 의료 통계 시각화 및 데이터 분석 영역입니다.

- **차트**
  - `환자수`와 `입내원일수`를 비교하는 **Dual-Axis 라인 차트** 구현
  - 차트의 **가로 무한 스크롤** 및 **Tooltip** 구현 
- **테이블**
  - 테이블의 **페이지네이션** 및 **정렬 기능** 구현

<table align="center" width="100%"> <tr> <th align="center" width="50%">차트</th> <th align="center" width="50%">테이블</th> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/c374f3ae-30e5-49ad-b7d8-f1bf8ae51280" width="100%" /> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/683107d0-c0ae-4087-a434-0229d2e48909" width="100%" /> </td> </tr> </table>

## 🔐 회원가입(/signup) 및 로그인(/signin) 
> **React Hook Form**과 **Zod**를 결합하여 비제어 컴포넌트 기반 리렌더링 최적화와 선언적 유효성 검사를 구현했습니다.

  - **리렌더링 최적화**
    - React의 상태(`useState`) 대신 `Ref` 기반의 **비제어 컴포넌트 방식**의 **RHF** 적용
    - 사용자가 타이핑할 때마다 전체 페이지가 리렌더링되는 **성능 저하 문제 해결**
  - **선언적 유효성 검사**
    - **Zod 스키마**를 통해 복잡한 검증 로직(이메일 패턴, 비밀번호 조합 등)을 UI 로직과 완전히 분리
    - 코드의 **가독성**과 **유지보수성** 개선
  - **실시간 UX 피드백**
    - `mode: "onChange"` 설정으로 불필요한 서버 요청 없이 클라이언트 사이드에서 **즉각적인 에러 메시지**를 제공
<table align="center">
  <tr>
    <th align="center">
      회원가입
    </th>
    <th align="center">
      로그인
    </th>
  </tr>
  <tr>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/cd3d3dee-ac22-42cd-9ab7-7df7b6d44f9f"
        height="420"
      />
    </td>
    <td align="center">
      <img
        src="https://github.com/user-attachments/assets/381a049e-33c8-4192-9a6d-ac28e4904a8f"
        height="420"
      />
    </td>
  </tr>
</table>

## 👤 문의 및 마이페이지
> **React Hook Form**과 **Zod**를 결합하여 비제어 컴포넌트 기반 리렌더링 최적화와 선언적 유효성 검사를 구현했습니다.

- **검증 로직**
  - **Zod**의 `refine`을 활용하여 신규 비밀번호와 확인 필드 간의 일치 여부를 검증하는 등 복잡한 조건부 로직을 선언적으로 처리
    
<table align="center" width="100%"> <tr> <th align="center">마이페이지</th> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/6688c17f-02fe-4fce-84d7-8330ae2fddcc" width="45%" alt="마이페이지 화면" /> </td> </tr> </table>

<table align="center" width="100%"> <tr> <th align="center" width="50%">문의</th> <th align="center" width="50%">문의 접수 이후</th> </tr> <tr> <td align="center"> <img src="https://github.com/user-attachments/assets/3878ade5-9836-4f1b-bf81-ce18df2947f3" width="100%" alt="마이페이지 화면" /> </td> <td align="center"> <img src="https://github.com/user-attachments/assets/b95b610e-0f10-4be7-9335-bcd0218b49ef" width="100%" alt="문의 접수 화면" /> </td> </tr> </table>

---

## 🛠️ 효율적인 개발을 위한 구조 설계
### 1. Zod & React Hook Form을 이용한 선언적 폼 관리
* **스키마 모듈화**
  - `nameField`, `emailField` 등 최소 단위 스키마를 정의하고 이를 조합하여 로그인/회원가입/마이페이지/문의하기 스키마 구성
  - 동일한 검증 로직의 중복 제거 
* **비즈니스 로직 응집을 통한 유지보수성**
  - 공백 체크, 특수문자 조합, 비밀번호 일치 확인 등 복잡한 요구사항을 Zod의 `refine`과 `regex`로 선언적으로 처리
  -  검증 규칙 변경 시 스키마 파일만 수정하면 서비스 전체에 반영되도록 설계

### 2. 공통 컴포넌트 설계
* **`Input`**: Zod 에러 메시지를 Props로 전달받아 실시간 피드백을 제공하며, Password Toggle 기능을 내장하여 모든 인증 폼에서 일관된 입력 경험 제공
* **`Button`**: 다양한 스타일(Variants)과 로딩 상태(isSubmitting)를 통합 관리하여 인터랙션 일관성 제공

---

## 배포 및 실행 방법 (Deployment & Run)

**Vercel**을 통해 배포되었으며, 아래 링크에서 확인하실 수 있습니다.

**🔗 [배포 링크 바로가기]([https://여기에_본인의_베르셀_주소_입력.vercel.app](https://assignment-hongsumin.vercel.app))**

#### **로컬 실행 방법 (Local Run)**
```bash
# 저장소 복제
git clone https://github.com/ghdtnals/assignment-hongsumin.git

# 의존성 설치 및 실행
npm install
npm run dev
