import { CartItem, Product } from "@/types";

export const Products: Product[] =  [
  {
    id: 1,
    name: "Жижиг-галнаш",
    weight: "420г",
    price: 320,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "24 часа",
    category: "Чеченская кухня",
    isNew: true,
    rating: 4.8,
    content: "Говядина, мука, яйца, лук, специи, зелень"
  },
  {
    id: 2,
    name: "Чебуреки (готовые)",
    weight: "500г",
    price: 280,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Готовая еда",
    isNew: false,
    rating: 4.6,
    content: "Мясной фарш, мука, вода, лук, специи, растительное масло"
  },
  {
    id: 3,
    name: "Хинкаль",
    weight: "600г",
    price: 350,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "36 часов",
    category: "Готовая еда",
    isNew: true,
    rating: 4.9,
    content: "Тесто, баранина, картофель, чеснок, зелень, бульон"
  },
  {
    id: 4,
    name: "Манты",
    weight: "800г",
    price: 420,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.7,
    content: "Тесто, говяжий фарш, лук, специи"
  },
  {
    id: 5,
    name: "Стейк Рибай",
    weight: "300г",
    price: 890,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "72 часа",
    category: "Мясная продукция",
    isNew: false,
    rating: 4.8,
    content: "Мраморная говядина, соль, перец"
  },
  {
    id: 6,
    name: "Сёмга слабосолёная",
    weight: "200г",
    price: 450,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "14 суток",
    category: "Рыба",
    isNew: true,
    rating: 4.5,
    content: "Филе сёмги, соль, сахар, специи"
  },
  {
    id: 7,
    name: "Хлеб бородинский",
    weight: "500г",
    price: 120,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "72 часа",
    category: "Хлебобулочные изделия",
    isNew: false,
    rating: 4.4,
    content: "Ржаная мука, пшеничная мука, солод, патока, тмин, кориандр"
  },
  {
    id: 8,
    name: "Лагман",
    weight: "457г",
    price: 380,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "24 часа",
    category: "Готовая еда",
    isNew: false,
    rating: 4.7,
    content: "Лапша, говядина, болгарский перец, морковь, лук, помидоры, специи"
  },
  {
    id: 9,
    name: "Фарш говяжий",
    weight: "1000г",
    price: 320,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.3,
    content: "Говядина, свинина"
  },
  {
    id: 10,
    name: "Шашлык из баранины",
    weight: "1000г",
    price: 780,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Праздничные блюда",
    isNew: true,
    rating: 4.9,
    content: "Баранина, лук, уксус, специи, зелень"
  },
  {
    id: 11,
    name: "Пельмени сибирские",
    weight: "1000г",
    price: 380,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "6 месяцев",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.6,
    content: "Тесто, говядина, свинина, лук, специи"
  },
  {
    id: 12,
    name: "Тирамису",
    weight: "250г",
    price: 280,
    image: "/images/product.jpg",
    images: [                   
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "72 часа",
    category: "Готовая еда",
    isNew: false,
    rating: 4.8,
    content: "Сыр маскарпоне, яйца, сахар, кофе, печенье савоярди, какао"
  }
];

export const popProducts: Product[] =  [
  {
    id: 1,
    name: "Манты",
    weight: "420г",
    price: 320,
    image: "/images/popProducts/manty.jpg",
    images: [                   
      "/images/popProducts/manty.jpg",
    ],
    shelfLife: "48 часов",
    category: "Чеченская кухня",
    isNew: true,
    rating: 4.8,
    content: "Говядина, мука, яйца, лук, специи, зелень"
  },
  {
    id: 2,
    name: "Чебуреки (готовые)",
    weight: "500г",
    price: 280,
    image: "/images/popProducts/chebureki1.jpg",
    images: [                     
      "/images/popProducts/chebureki1.jpg",
    ],
    shelfLife: "48 часов",
    category: "Готовая еда",
    isNew: false,
    rating: 4.6,
    content: "Мясной фарш, мука, вода, лук, специи, растительное масло"
  },
  {
    id: 3,
    name: "Вареники с творогом",
    weight: "600г",
    price: 350,
    image: "/images/popProducts/vareniki1.jpg",
    images: [                     
      "/images/popProducts/vareniki1.jpg",
    ],
    shelfLife: "36 часов",
    category: "Готовая еда",
    isNew: true,
    rating: 4.9,
    content: "Тесто, баранина, картофель, чеснок, зелень, бульон"
  },
  {
    id: 4,
    name: "Котлеты по киевски",
    weight: "800г",
    price: 420,
    image: "/images/popProducts/katlet_po_k.jpg",
    images: [                     
      "/images/popProducts/katlet_po_k.jpg"
    ],
    shelfLife: "48 часов",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.7,
    content: "Тесто, говяжий фарш, лук, специи"
  },
  {
    id: 5,
    name: "Голубцы",
    weight: "300г",
    price: 890,
    image: "/images/popProducts/golubec.jpg",
    images: [                     
      "/images/popProducts/golubec.jpg"
    ],
    shelfLife: "72 часа",
    category: "Мясная продукция",
    isNew: false,
    rating: 4.8,
    content: "Мраморная говядина, соль, перец"
  },
];

export const recProducts: Product[] =  [
  {
    id: 1,
    name: "Пельмени",
    weight: "420г",
    price: 320,
    image: "/images/recProducts/pelmeni.jpg",
    images: [                     
        "/images/recProducts/pelmeni.jpg",
    ],
    shelfLife: "6 месяцев",
    category: "Чеченская кухня",
    isNew: true,
    rating: 4.8,
    content: "Говядина, мука, яйца, лук, специи, зелень"
  },
  {
    id: 2,
    name: "Хинкали с мясом",
    weight: "500г",
    price: 280,
    image: "/images/recProducts/hinkali.jpg",
    images: [                     
      "/images/recProducts/hinkali.jpg"
    ],
    shelfLife: "36 часов",
    category: "Готовая еда",
    isNew: false,
    rating: 4.6,
    content: "Мясной фарш, мука, вода, лук, специи, растительное масло"
  },
  {
    id: 3,
    name: "Малиновое варенье",
    weight: "600г",
    price: 350,
    image: "/images/recProducts/mal_vareni.jpg",
    images: [                     
      "/images/recProducts/mal_vareni.jpg",
    ],
    shelfLife: "2 года",
    category: "Готовая еда",
    isNew: true,
    rating: 4.9,
    content: "Тесто, баранина, картофель, чеснок, зелень, бульон"
  },
  {
    id: 4,
    name: "Пирожки с капустой",
    weight: "800г",
    price: 420,
    image: "/images/recProducts/piroshki_s_kap.jpg",
    images: [                     
      "/images/recProducts/piroshki_s_kap.jpg",
    ],
    shelfLife: "48 часов",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.7,
    content: "Тесто, говяжий фарш, лук, специи"
  },
  {
    id: 5,
    name: "Мини-чебуреки",
    weight: "300г",
    price: 890,
    image: "/images/recProducts/mini_chEbs.JPG",
    images: [                     
      "/images/recProducts/mini_chEbs.JPG",
    ],
    shelfLife: "48 часов",
    category: "Мясная продукция",
    isNew: false,
    rating: 4.8,
    content: "Мраморная говядина, соль, перец"
  },
];

export const favProducts: Product[] = [
  {
    id: 1,
    name: "Жижиг-галнаш",
    weight: "420г",
    price: 320,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "24 часа",
    category: "Чеченская кухня",
    isNew: true,
    rating: 4.8,
    content: "Говядина, мука, яйца, лук, специи, зелень"
  },
  {
    id: 2,
    name: "Чебуреки (готовые)",
    weight: "500г",
    price: 280,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Готовая еда",
    isNew: false,
    rating: 4.6,
    content: "Мясной фарш, мука, вода, лук, специи, растительное масло"
  },
  {
    id: 3,
    name: "Хинкаль",
    weight: "600г",
    price: 350,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "36 часов",
    category: "Готовая еда",
    isNew: true,
    rating: 4.9,
    content: "Тесто, баранина, картофель, чеснок, зелень, бульон"
  },
  {
    id: 4,
    name: "Манты",
    weight: "800г",
    price: 420,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "48 часов",
    category: "Полуфабрикаты",
    isNew: false,
    rating: 4.7,
    content: "Тесто, говяжий фарш, лук, специи"
  },
  {
    id: 5,
    name: "Стейк Рибай",
    weight: "300г",
    price: 890,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "72 часа",
    category: "Мясная продукция",
    isNew: false,
    rating: 4.8,
    content: "Мраморная говядина, соль, перец"
  },
  {
    id: 6,
    name: "Сёмга слабосолёная",
    weight: "200г",
    price: 450,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "14 суток",
    category: "Рыба",
    isNew: true,
    rating: 4.5,
    content: "Филе сёмги, соль, сахар, специи"
  },
  {
    id: 7,
    name: "Хлеб бородинский",
    weight: "500г",
    price: 120,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "72 часа",
    category: "Хлебобулочные изделия",
    isNew: false,
    rating: 4.4,
    content: "Ржаная мука, пшеничная мука, солод, патока, тмин, кориандр"
  },
  {
    id: 8,
    name: "Лагман",
    weight: "457г",
    price: 380,
    image: "/images/product.jpg",
    images: [                     
      "/images/product1.jpg",
      "/images/product2.jpg",
    ],
    shelfLife: "24 часа",
    category: "Готовая еда",
    isNew: false,
    rating: 4.7,
    content: "Лапша, говядина, болгарский перец, морковь, лук, помидоры, специи"
  },
];

export const mockCartItems: CartItem[] = [
  {
    id: 1,
    name: "Пицца Маргарита",
    price: 450,
    weight: 550,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 2,
    name: "Бургер с говядиной",
    price: 350,
    weight: 320,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 3,
    name: "Картошка фри",
    price: 180,
    weight: 200,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 4,
    name: "Цезарь с курицей",
    price: 320,
    weight: 280,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 5,
    name: "Спагетти Карбонара",
    price: 390,
    weight: 420,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 6,
    name: "Греческий салат",
    price: 250,
    weight: 300,
    image: "/images/product.jpg",
    quantity: 2,
  },
  {
    id: 7,
    name: "Стейк из лосося",
    price: 650,
    weight: 280,
    image: "/images/product.jpg",
    quantity: 1,
  },
  {
    id: 8,
    name: "Шоколадный фондан",
    price: 220,
    weight: 150,
    image: "/images/product.jpg",
    quantity: 3,
  },
];