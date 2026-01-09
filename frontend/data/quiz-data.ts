export type Axis = "Command" | "Time" | "Play" | "Value";

export interface Question {
    id: number;
    story: string;
    image?: string; // We can add illustrations later
    axis: Axis;
    choices: [
        { text: string; value: number; type: string }, // value usually adds to the axis score
        { text: string; value: number; type: string }
    ];
}

export const QUIZ_QUESTIONS: Question[] = [
    // --- COMMAND (Spending vs Saving) ---
    {
        id: 1,
        story: "모험을 떠나기 전, 왕에게서 100 골드를 지원금으로 받았습니다. 당신은 이 돈을 어떻게 하시겠습니까?",
        image: "/quiz/q1.png",
        axis: "Command",
        choices: [
            { text: "든든한 장비부터 맞춘다! 최고급 검 구매!", value: 10, type: "Spender" },
            { text: "혹시 모르니 아껴둔다. 기본 장비만 챙기자.", value: -10, type: "Saver" },
        ],
    },
    {
        id: 5,
        story: "마을 축제가 열렸습니다. 한정판 '전설의 물약'을 팔고 있네요! 효과는 알 수 없지만 지금 아니면 못 삽니다.",
        image: "/quiz/q5.png",
        axis: "Command",
        choices: [
            { text: "한정판은 못 참지! 바로 지른다.", value: 10, type: "Spender" },
            { text: "효과도 모르는데? 그냥 지나친다.", value: -10, type: "Saver" },
        ],
    },
    {
        id: 9,
        story: "던전 탐험 중 보물상자를 발견했습니다. 하지만 열려면 50골드를 내야 하는 마법이 걸려있네요.",
        image: "/quiz/q9.png",
        axis: "Command",
        choices: [
            { text: "대박일 수도 있잖아? 투자한다!", value: 10, type: "Spender" },
            { text: "꽝이면 어떡해? 내 돈은 소중해.", value: -10, type: "Saver" },
        ],
    },

    // --- TIME (Fast/Risk vs Slow/Safe) ---
    {
        id: 2,
        story: "목적지로 가는 두 갈래 길이 나왔습니다. 왼쪽은 빠르지만 몬스터가 출몰하고, 오른쪽은 안전하지만 3일이 더 걸립니다.",
        image: "/quiz/q2.png",
        axis: "Time",
        choices: [
            { text: "시간이 금이다! 위험해도 빠른 길로 간다.", value: 10, type: "Fast" },
            { text: "안전이 제일이지. 천천히 돌아간다.", value: -10, type: "Slow" },
        ],
    },
    {
        id: 6,
        story: "마법 은행에서 '황금 알 낳는 거위' 상품을 추천합니다. 수익률은 높지만 원금 손실 위험이 있다고 하네요.",
        image: "/quiz/q6.png",
        axis: "Time",
        choices: [
            { text: "인생은 한 방! 과감하게 투자한다.", value: 10, type: "Fast" },
            { text: "원금을 잃을 순 없어. 안전한 예금이 좋다.", value: -10, type: "Slow" },
        ],
    },
    {
        id: 10,
        story: "신비한 상인이 '미래를 보는 수정구슬'을 팝니다. 비싸지만 앞으로의 일을 알 수 있습니다.",
        image: "/quiz/q10.png",
        axis: "Time",
        choices: [
            { text: "미래를 알면 더 빨리 성공할 수 있어! 산다.", value: 10, type: "Fast" },
            { text: "미래는 내가 만들어가는 것. 현재에 충실한다.", value: -10, type: "Slow" },
        ],
    },

    // --- PLAY (Experience vs Possession/Practicality) ---
    {
        id: 3,
        story: "동료들과 여관에 들렀습니다. 메뉴판에 '용의 눈물'이라는 초고가 음료가 있네요. 맛이 너무 궁금합니다.",
        image: "/quiz/q3.png",
        axis: "Play",
        choices: [
            { text: "경험이 재산이지! 한 번 마셔본다.", value: 10, type: "Experiencer" },
            { text: "물이나 마시자. 배만 부르면 돼.", value: -10, type: "Practical" },
        ],
    },
    {
        id: 7,
        story: "모험 중 아름다운 경치를 자랑하는 유료 전망대가 있습니다. 입장료가 꽤 비싼데...",
        image: "/quiz/q7.png",
        axis: "Play",
        choices: [
            { text: "이 뷰는 평생 추억이야! 올라간다.", value: 10, type: "Experiencer" },
            { text: "밑에서 봐도 예쁜데 굳이? 사진만 찍는다.", value: -10, type: "Practical" },
        ],
    },
    {
        id: 11,
        story: "전설의 음유시인 콘서트 티켓을 구했습니다! 그런데 암표상이 10배 가격에 팔라고 하네요.",
        image: "/quiz/q11.png",
        axis: "Play",
        choices: [
            { text: "돈이나 벌자. 판다.", value: -10, type: "Practical" },
            { text: "내가 가야지! 돈보다 추억이다.", value: 10, type: "Experiencer" },
        ],
    },

    // --- VALUE (Social vs Self) ---
    {
        id: 4,
        story: "길을 가다 배고픈 아이를 만났습니다. 당신의 식량을 나눠주면 당신이 오늘 굶어야 할 수도 있습니다.",
        image: "/quiz/q4.png",
        axis: "Value",
        choices: [
            { text: "같이 살아야지. 식량을 나눠준다.", value: 10, type: "Social" },
            { text: "나도 먹고 살기 힘들어. 미안하지만 지나친다.", value: -10, type: "Self" },
        ],
    },
    {
        id: 8,
        story: "동료가 빌린 돈을 갚지 않고 있습니다. 사정은 딱해 보이는데...",
        image: "/quiz/q8.png",
        axis: "Value",
        choices: [
            { text: "그래, 친구니까 좀 더 기다려준다.", value: 10, type: "Social" },
            { text: "돈 관계는 확실해야지. 독촉한다.", value: -10, type: "Self" },
        ],
    },
    {
        id: 12,
        story: "마왕을 물리치고 막대한 보상금을 받았습니다! 이 돈을 어떻게 쓸까요?",
        image: "/quiz/q12.png",
        axis: "Value",
        choices: [
            { text: "고생한 동료들과 마을 사람들을 위해 파티를 연다!", value: 10, type: "Social" },
            { text: "나를 위한 최고의 휴가와 저택을 산다.", value: -10, type: "Self" },
        ],
    },
];
