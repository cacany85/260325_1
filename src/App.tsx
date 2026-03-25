import { useState, useEffect } from "react";
import { 
  Heart, 
  Share2, 
  ShoppingCart, 
  ChevronRight, 
  ChevronDown, 
  Star, 
  Truck, 
  ShieldCheck, 
  Clock, 
  MessageCircle, 
  Phone, 
  MapPin,
  Menu,
  Search,
  User,
  Bell,
  Home,
  ArrowLeft,
  X
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

// Mock data for the product
const productData = {
  id: "4589382709",
  name: "[비전메일] 프리미엄 사무용 메일함 / 우편함 / 택배함 (대형)",
  price: 89000,
  discountRate: 15,
  originalPrice: 104700,
  rating: 4.8,
  reviewCount: 1240,
  deliveryFee: 3000,
  deliveryInfo: "내일(목) 3/27 도착 예정",
  images: [
    "https://picsum.photos/seed/mailbox1/800/800",
    "https://picsum.photos/seed/mailbox2/800/800",
    "https://picsum.photos/seed/mailbox3/800/800",
    "https://picsum.photos/seed/mailbox4/800/800",
  ],
  options: [
    { name: "색상", values: ["블랙", "화이트", "다크그레이", "실버"] },
    { name: "사이즈", values: ["기본형", "대형 (+15,000원)", "특대형 (+30,000원)"] },
  ],
  detailImages: [
    "https://picsum.photos/seed/detail1/1200/1800",
    "https://picsum.photos/seed/detail2/1200/1800",
    "https://picsum.photos/seed/detail3/1200/1800",
  ]
};

export default function App() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [isSticky, setIsSticky] = useState(false);
  const [activeTab, setActiveTab] = useState("상세정보");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 800);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ko-KR").format(price);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">
      {/* Top Navigation */}
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-xl font-bold text-[#03c75a] tracking-tight">비전메일</h1>
          </div>
          <div className="flex-1 max-w-md mx-8 hidden md:block">
            <div className="relative">
              <input 
                type="text" 
                placeholder="스토어 내 상품 검색" 
                className="w-full bg-gray-100 border-none rounded-full py-2 px-10 focus:ring-2 focus:ring-[#03c75a] transition-all"
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="p-2 hover:bg-gray-100 rounded-full relative">
              <ShoppingCart className="w-6 h-6" />
              <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center">2</span>
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full">
              <User className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left: Image Gallery */}
          <div className="space-y-4">
            <div className="aspect-square rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
              <motion.img 
                key={selectedImage}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                src={productData.images[selectedImage]} 
                alt="Product" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
              {productData.images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 transition-all shrink-0 ${
                    selectedImage === idx ? "border-[#03c75a]" : "border-transparent opacity-60 hover:opacity-100"
                  }`}
                >
                  <img src={img} alt={`Thumb ${idx}`} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          </div>

          {/* Right: Product Info */}
          <div className="space-y-6">
            <div className="space-y-2">
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <span>사무용품</span>
                <ChevronRight className="w-3 h-3" />
                <span>우편함/택배함</span>
              </div>
              <h2 className="text-2xl font-bold leading-tight">{productData.name}</h2>
              <div className="flex items-center gap-2">
                <div className="flex items-center text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`w-4 h-4 fill-current ${i < Math.floor(productData.rating) ? "" : "text-gray-300"}`} />
                  ))}
                </div>
                <span className="text-sm font-bold">{productData.rating}</span>
                <span className="text-sm text-gray-400">({productData.reviewCount}건)</span>
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-3xl font-extrabold text-red-500">{productData.discountRate}%</span>
                <span className="text-3xl font-extrabold">{formatPrice(productData.price)}원</span>
              </div>
              <div className="text-gray-400 line-through text-lg">{formatPrice(productData.originalPrice)}원</div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 space-y-3">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Truck className="w-4 h-4" /> 배송비
                </span>
                <span className="font-medium">{formatPrice(productData.deliveryFee)}원 (30,000원 이상 구매 시 무료)</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 배송안내
                </span>
                <span className="font-medium text-blue-600">{productData.deliveryInfo}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4" /> 혜택
                </span>
                <span className="font-medium">네이버페이 포인트 최대 2,340원 적립</span>
              </div>
            </div>

            {/* Options */}
            <div className="space-y-4">
              {productData.options.map((opt) => (
                <div key={opt.name} className="space-y-2">
                  <label className="text-sm font-bold text-gray-700">{opt.name}</label>
                  <div className="relative">
                    <select 
                      className="w-full appearance-none bg-white border border-gray-200 rounded-lg py-3 px-4 text-sm focus:ring-2 focus:ring-[#03c75a] focus:border-transparent transition-all outline-none"
                      onChange={(e) => setSelectedOptions(prev => ({ ...prev, [opt.name]: e.target.value }))}
                    >
                      <option value="">{opt.name} 선택</option>
                      {opt.values.map(val => (
                        <option key={val} value={val}>{val}</option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Options Summary */}
            <AnimatePresence>
              {Object.keys(selectedOptions).length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="bg-gray-50 rounded-xl p-4 space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div className="text-sm">
                      {Object.entries(selectedOptions).map(([key, val]) => (
                        <div key={key} className="text-gray-600">{key}: {val}</div>
                      ))}
                    </div>
                    <button 
                      onClick={() => setSelectedOptions({})}
                      className="p-1 hover:bg-gray-200 rounded-full"
                    >
                      <X className="w-4 h-4 text-gray-400" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center pt-2 border-t border-gray-200">
                    <div className="flex items-center gap-2">
                      <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-white">-</button>
                      <span className="w-8 text-center font-bold">1</span>
                      <button className="w-8 h-8 rounded border border-gray-300 flex items-center justify-center hover:bg-white">+</button>
                    </div>
                    <div className="font-bold text-lg">{formatPrice(productData.price)}원</div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <div className="flex justify-between items-center py-4 border-t border-gray-100">
              <span className="text-lg font-bold">총 상품 금액</span>
              <span className="text-2xl font-extrabold text-[#03c75a]">{formatPrice(productData.price)}원</span>
            </div>

            {/* Action Buttons */}
            <div className="grid grid-cols-6 gap-2">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`col-span-1 border border-gray-200 rounded-xl flex items-center justify-center transition-all ${isLiked ? "bg-red-50 border-red-200" : "hover:bg-gray-50"}`}
              >
                <Heart className={`w-6 h-6 ${isLiked ? "fill-red-500 text-red-500" : "text-gray-400"}`} />
              </button>
              <button className="col-span-2 bg-gray-900 text-white font-bold py-4 rounded-xl hover:bg-black transition-all">
                장바구니
              </button>
              <button className="col-span-3 bg-[#03c75a] text-white font-bold py-4 rounded-xl hover:bg-[#02b350] transition-all shadow-lg shadow-[#03c75a]/20">
                구매하기
              </button>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-20">
          <div className="sticky top-16 z-40 bg-white border-b border-gray-200 flex">
            {["상세정보", "리뷰", "Q&A", "반품/교환"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 text-sm font-bold transition-all relative ${
                  activeTab === tab ? "text-[#03c75a]" : "text-gray-500 hover:text-gray-800"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <motion.div layoutId="tabLine" className="absolute bottom-0 left-0 right-0 h-1 bg-[#03c75a]" />
                )}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="py-12 space-y-8">
            {activeTab === "상세정보" && (
              <div className="max-w-4xl mx-auto space-y-12">
                <div className="text-center space-y-4">
                  <h3 className="text-3xl font-black tracking-tight">VISION MAILL PREMIUM</h3>
                  <p className="text-gray-500 text-lg">당신의 공간을 완성하는 프리미엄 메일함</p>
                </div>
                <div className="space-y-0">
                  {productData.detailImages.map((img, idx) => (
                    <img 
                      key={idx} 
                      src={img} 
                      alt={`Detail ${idx}`} 
                      className="w-full h-auto" 
                      referrerPolicy="no-referrer"
                    />
                  ))}
                </div>
                <div className="bg-gray-50 p-8 rounded-3xl space-y-6">
                  <h4 className="text-xl font-bold">제품 사양</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">모델명</span>
                      <span className="font-medium">VM-2024-PREMIUM</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">소재</span>
                      <span className="font-medium">스테인리스 스틸 (분체도장)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">사이즈</span>
                      <span className="font-medium">450 x 300 x 150 (mm)</span>
                    </div>
                    <div className="flex justify-between border-b border-gray-200 pb-2">
                      <span className="text-gray-500">제조국</span>
                      <span className="font-medium">대한민국</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {activeTab === "리뷰" && (
              <div className="max-w-4xl mx-auto space-y-8">
                <div className="flex items-center justify-between border-b border-gray-100 pb-6">
                  <h3 className="text-xl font-bold">사용자 리뷰 ({productData.reviewCount})</h3>
                  <button className="text-sm font-bold text-[#03c75a] hover:underline">리뷰 작성하기</button>
                </div>
                <div className="space-y-8">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="space-y-3 border-b border-gray-50 pb-8">
                      <div className="flex items-center gap-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, j) => <Star key={j} className="w-3 h-3 fill-current" />)}
                        </div>
                        <span className="text-xs text-gray-400">user_{i}42 | 2024.03.2{i}</span>
                      </div>
                      <p className="text-sm leading-relaxed">
                        배송도 빠르고 제품 퀄리티가 정말 좋네요. 사무실 앞에 설치했는데 디자인이 깔끔해서 분위기가 확 살아납니다. 
                        대형 사이즈라 큰 우편물도 넉넉하게 들어가서 만족스러워요. 추천합니다!
                      </p>
                      <div className="flex gap-2">
                        <img src={`https://picsum.photos/seed/review${i}/200/200`} className="w-20 h-20 rounded-lg object-cover" referrerPolicy="no-referrer" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Sticky Bottom Bar (Mobile) */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 z-50 flex gap-2">
        <button className="p-3 border border-gray-200 rounded-xl">
          <Heart className="w-6 h-6 text-gray-400" />
        </button>
        <button className="flex-1 bg-gray-900 text-white font-bold py-3 rounded-xl">장바구니</button>
        <button className="flex-1 bg-[#03c75a] text-white font-bold py-3 rounded-xl">구매하기</button>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-200 py-16 mt-20">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="space-y-4">
            <h4 className="text-lg font-bold">고객센터</h4>
            <div className="text-2xl font-black text-[#03c75a]">1588-0000</div>
            <div className="text-sm text-gray-500 space-y-1">
              <p>평일 09:00 - 18:00 (점심시간 12:00 - 13:00)</p>
              <p>주말 및 공휴일 휴무</p>
            </div>
            <div className="flex gap-2">
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold flex items-center gap-2">
                <MessageCircle className="w-4 h-4" /> 톡톡문의
              </button>
              <button className="p-2 bg-white border border-gray-200 rounded-lg text-xs font-bold flex items-center gap-2">
                <Phone className="w-4 h-4" /> 전화문의
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold">스토어 정보</h4>
            <div className="text-sm text-gray-500 space-y-1">
              <p>상호명: 비전메일 (VISION MAILL)</p>
              <p>대표자: 홍길동</p>
              <p>사업자등록번호: 000-00-00000</p>
              <p>통신판매업신고: 제2024-서울강남-0000호</p>
            </div>
          </div>
          <div className="space-y-4">
            <h4 className="text-lg font-bold">배송/반품 안내</h4>
            <div className="text-sm text-gray-500 space-y-1">
              <p>반품배송비: 편도 3,000원 (최초 배송비 무료인 경우 6,000원)</p>
              <p>교환배송비: 6,000원</p>
              <p>보내실 곳: 서울특별시 강남구 테헤란로 000 비전빌딩 4층</p>
            </div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-gray-200 text-center text-xs text-gray-400">
          © 2024 VISION MAILL. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
