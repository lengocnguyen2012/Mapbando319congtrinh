// Initialize Mapbox
mapboxgl.accessToken = 'pk.eyJ1Ijoibmd1eWVuLXByb3h2MTEiLCJhIjoiY21odWNncndzMjB6ZTJrcHNzdDk4ZTc3eiJ9.veonBAcz6ZRTzxQ5WOsrYQ';

// Configuration
const CONFIG = {
    MAP: {
        center: [108.2772, 14.0583],
        zoom: 5,
        pitch: 45,
        styles: {
            satellite: 'mapbox://styles/mapbox/satellite-v9',
            light: 'mapbox://styles/mapbox/light-v11',
            dark: 'mapbox://styles/mapbox/dark-v11',
            street: 'mapbox://styles/mapbox/streets-v11'
        }
    },
    COLORS: {
        commercial: '#e74c3c',
        transport: '#3498db',
        industrial: '#2ecc71',
        default: '#667eea'
    },
    PROJECT_TYPES: {
        commercial: 'Thương mại',
        transport: 'Giao thông',
        industrial: 'Công nghiệp',
        default: 'Khác'
    },
    THEMES: {
        light: {
            name: 'Sáng',
            icon: 'fa-sun'
        },
        dark: {
            name: 'Tối',
            icon: 'fa-moon'
        },
        auto: {
            name: 'Tự động',
            icon: 'fa-adjust'
        }
    }
};

// Khởi tạo map
const map = new mapboxgl.Map({
    container: 'map',
    style: CONFIG.MAP.styles.satellite,
    center: CONFIG.MAP.center,
    zoom: CONFIG.MAP.zoom,
    pitch: CONFIG.MAP.pitch
});

// Add navigation controls
map.addControl(new mapboxgl.NavigationControl());

// ====== IMAGE MANAGER CLASS ======
class ImageManager {
    constructor() {
        this.images = this.loadImagesFromStorage();
        this.currentProjectImages = [];
        this.currentImageIndex = 0;
    }

    // Lấy ảnh từ localStorage
    loadImagesFromStorage() {
        const stored = localStorage.getItem('projectImages');
        return stored ? JSON.parse(stored) : {};
    }

    // Lưu ảnh vào localStorage
    saveImagesToStorage() {
        localStorage.setItem('projectImages', JSON.stringify(this.images));
    }

    // Thêm ảnh cho dự án
    addImageToProject(projectId, imagePath, imageName) {
        if (!this.images[projectId]) {
            this.images[projectId] = [];
        }

        this.images[projectId].push({
            url: imagePath,
            name: imageName,
            uploadedAt: new Date().toLocaleString('vi-VN'),
            id: Date.now()
        });

        this.saveImagesToStorage();
        return true;
    }

    // Lấy ảnh của dự án
    getProjectImages(projectId) {
        return this.images[projectId] || [];
    }

    // Xóa ảnh
    removeImage(projectId, imageId) {
        if (this.images[projectId]) {
            this.images[projectId] = this.images[projectId].filter(img => img.id !== imageId);
            this.saveImagesToStorage();
        }
    }

    // Lấy ảnh đầu tiên (thumbnail)
    getThumbnail(projectId) {
        const images = this.getProjectImages(projectId);
        return images.length > 0 ? images[0].url : null;
    }

    // Đếm ảnh
    getImageCount(projectId) {
        return this.getProjectImages(projectId).length;
    }
}

// ====== NORMALIZED & COMPLETE PROJECT DATA ======
const projectsData = [
    // ===== TPHCM - THƯƠNG MẠI =====
    {
        id: 1,
        name: "Landmark 81",
        province: "TP. Hồ Chí Minh",
        address: "720A Điện Biên Phủ, P. 22, Q. Bình Thạnh",
        investor: "Vingroup",
        year: "2018",
        scale: "241.000 m²",
        description: "Tòa nhà cao nhất Việt Nam, trung tâm thương mại và văn phòng hiện đại",
        budget: "2.7 tỷ USD",
        status: "in-progress",
        lat: 10.7951,
        lng: 106.7219,
        type: "commercial",
        images: ["images/projects/landmark-81.jpg"]
    },
    {
        id: 2,
        name: "Vincom Center Đồng Khởi",
        province: "TP. Hồ Chí Minh",
        address: "72 Lê Thánh Tôn, P. Bến Nghé, Quận 1",
        investor: "Vingroup",
        year: "2010",
        scale: "120.000 m²",
        description: "Trung tâm thương mại cao cấp tại trung tâm Sài Gòn",
        budget: "500 triệu USD",
        status: "completed",
        lat: 10.7792,
        lng: 106.7035,
        type: "commercial",
        images: ["images/projects/vincom-dong-khoi.jpg"]
    },
    {
        id: 3,
        name: "Tòa nhà Lotte Center Hà Nội",
        province: "Hà Nội",
        address: "54 Liễu Giai, P. Cống Vị, Quận Ba Đình",
        investor: "Lotte Group",
        year: "2014",
        scale: "170.000 m²",
        description: "Toà tháp sinh đôi cao nhất Hà Nội",
        budget: "1.5 tỷ USD",
        status: "completed",
        lat: 21.0365,
        lng: 105.8146,
        type: "commercial",
        images: ["images/projects/lotte-center-ha-noi.jpg"]
    },
    {
        id: 4,
        name: "AEON MALL Bình Tân",
        province: "TP. Hồ Chí Minh",
        address: "Số 1 Đường 17A, P. Bình Trị Đông B, Q. Bình Tân",
        investor: "AEON Group",
        year: "2016",
        scale: "140.000 m²",
        description: "Trung tâm mua sắm hàng đầu Việt Nam",
        budget: "400 triệu USD",
        status: "completed",
        lat: 10.7639,
        lng: 106.6094,
        type: "commercial",
        images: [""]
    },
    {
        id: 5,
        name: "Vietcombank Tower",
        province: "TP. Hồ Chí Minh",
        address: "5 Công Trường Mê Linh, P. Bến Nghé, Quận 1",
        investor: "Vietcombank",
        year: "2010",
        scale: "85.000 m²",
        description: "Tòa nhà văn phòng cao cấp của Vietcombank",
        budget: "300 triệu USD",
        status: "completed",
        lat: 10.7823,
        lng: 106.7052,
        type: "commercial",
        images: ["images/projects/vietcombank-tower.jpg"]
    },

    // ===== GIAO THÔNG =====
    {
        id: 6,
        name: "Cầu Thuận Phước",
        province: "Đà Nẵng",
        address: "Nối Q. Hải Châu với Q. Sơn Trà",
        investor: "Bộ Giao thông Vận tải",
        year: "2009",
        scale: "1.850 m",
        description: "Cầu dây văng nối trung tâm thành phố với bán đảo Sơn Trà",
        budget: "200 triệu USD",
        status: "completed",
        lat: 16.0825,
        lng: 108.2208,
        type: "transport",
        images: ["images/projects/cau-thuan-phuoc.jpg"]
    },
    {
        id: 7,
        name: "Hầm đường bộ Hải Vân",
        province: "Thừa Thiên Huế - Đà Nẵng",
        address: "Đèo Hải Vân, giáp ranh Huế - Đà Nẵng",
        investor: "Bộ Giao thông Vận tải",
        year: "2005",
        scale: "6.280 m",
        description: "Hầm đường bộ dài nhất Việt Nam, giảm thời gian di chuyển",
        budget: "900 triệu USD",
        status: "completed",
        lat: 16.1994,
        lng: 108.1069,
        type: "transport",
        images: []
    },
    {
        id: 8,
        name: "Cầu Bãi Cháy",
        province: "Quảng Ninh",
        address: "Nối TP. Hạ Long với TP. Cẩm Phả",
        investor: "Bộ Giao thông Vận tải",
        year: "2006",
        scale: "903 m",
        description: "Cầu dây văng vượt Vịnh Hạ Long",
        budget: "150 triệu USD",
        status: "completed",
        lat: 20.9608,
        lng: 107.0739,
        type: "transport",
        images: []
    },
    {
        id: 9,
        name: "Sân bay Long Thành",
        province: "Đồng Nai",
        address: "Huyện Long Thành, Tỉnh Đồng Nai",
        investor: "ACV",
        year: "2025",
        scale: "5.000 ha",
        description: "Sân bay quốc tế lớn nhất Việt Nam, dự kiến khánh thành 2025",
        budget: "15 tỷ USD",
        status: "in-progress",
        lat: 10.7754,
        lng: 107.0593,
        type: "transport",
        images: []
    },
    {
        id: 10,
        name: "Cầu Rồng Đà Nẵng",
        province: "Đà Nẵng",
        address: "Đường Nguyễn Văn Linh, P. Phước Ninh, Q. Hải Châu",
        investor: "UBND TP. Đà Nẵng",
        year: "2013",
        scale: "1.050 m",
        description: "Cầu độc đáo hình con rồng có thể phun nước và lửa",
        budget: "100 triệu USD",
        status: "completed",
        lat: 16.0617,
        lng: 108.2274,
        type: "transport",
        images: []
    },
    {
        id: 11,
        name: "Cầu Nhật Tân Hà Nội",
        province: "Hà Nội",
        address: "P. Phú Thượng, Q. Tây Hồ nối H. Đông Anh",
        investor: "Bộ GTVT",
        year: "2015",
        scale: "2.500 m",
        description: "Cầu dây văng hỗ trợ lưu thông khu vực Tây Hồ",
        budget: "250 triệu USD",
        status: "completed",
        lat: 21.0827,
        lng: 105.8159,
        type: "transport",
        images: []
    },
    {
        id: 12,
        name: "Cầu Cần Thơ",
        province: "Cần Thơ",
        address: "Q. Cái Răng nối tỉnh Vĩnh Long",
        investor: "Bộ GTVT",
        year: "2010",
        scale: "2.750 m",
        description: "Cầu dây văng qua sông Hậu, kết nối Cần Thơ - Vĩnh Long",
        budget: "350 triệu USD",
        status: "completed",
        lat: 10.0416,
        lng: 105.7997,
        type: "transport",
        images: []
    },

    // ===== CÔNG NGHIỆP =====
    {
        id: 13,
        name: "Nhà máy Ô tô Thành Công",
        province: "Ninh Bình",
        address: "Khu công nghiệp Gián Khẩu, Huyện Gia Viễn",
        investor: "Tập đoàn Thành Công",
        year: "2019",
        scale: "1.200.000 m²",
        description: "Nhà máy sản xuất ô tô hiện đại với công nghệ Robot",
        budget: "2 tỷ USD",
        status: "in-progress",
        lat: 20.3256,
        lng: 105.8972,
        type: "industrial",
        images: []
    },
    {
        id: 14,
        name: "Khu liên hợp gang thép Hòa Phát Dung Quất",
        province: "Quảng Ngãi",
        address: "Khu kinh tế Dung Quất, Huyện Bình Sơn",
        investor: "Tập đoàn Hòa Phát",
        year: "2020",
        scale: "3.300.000 m²",
        description: "Khu liên hợp luyện thép lớn nhất Việt Nam",
        budget: "3.5 tỷ USD",
        status: "in-progress",
        lat: 15.4028,
        lng: 108.8014,
        type: "industrial",
        images: []
    },
    {
        id: 15,
        name: "Nhà máy Samsung Thái Nguyên",
        province: "Thái Nguyên",
        address: "Khu công nghiệp Yên Bình, TP. Phổ Yên",
        investor: "Samsung Electronics",
        year: "2014",
        scale: "1.100.000 m²",
        description: "Nhà máy điện tử Samsung tại Việt Nam",
        budget: "1.8 tỷ USD",
        status: "completed",
        lat: 21.4567,
        lng: 105.8642,
        type: "industrial",
        images: []
    },
    {
        id: 16,
        name: "Nhà máy Hyundai Ninh Bình",
        province: "Ninh Bình",
        address: "Khu công nghiệp Khánh Phú, Huyện Yên Khánh",
        investor: "Hyundai - Thành Công",
        year: "2020",
        scale: "1.500.000 m²",
        description: "Nhà máy sản xuất ô tô Hyundai tại Việt Nam",
        budget: "2.2 tỷ USD",
        status: "in-progress",
        lat: 20.1894,
        lng: 106.0458,
        type: "industrial",
        images: []
    },
    {
        id: 17,
        name: "VinFast - Hải Phòng",
        province: "Hải Phòng",
        address: "Đảo Cát Hải, Khu kinh tế Đình Vũ – Cát Hải",
        investor: "Vingroup",
        year: "2019",
        scale: "3.350.000 m²",
        description: "Nhà máy sản xuất ô tô điện VinFast",
        budget: "2 tỷ USD",
        status: "completed",
        lat: 20.8197,
        lng: 106.8770,
        type: "industrial",
        images: []
    },
    {
        id: 18,
        name: "Nhà máy Lọc dầu Dung Quất",
        province: "Quảng Ngãi",
        address: "Xã Bình Thuận, H. Bình Sơn, KKT Dung Quất",
        investor: "BSR (Petrovietnam)",
        year: "2009",
        scale: "8.200.000 m²",
        description: "Nhà máy lọc dầu lớn nhất Việt Nam",
        budget: "2.5 tỷ USD",
        status: "completed",
        lat: 15.3800,
        lng: 108.7845,
        type: "industrial",
        images: []
    },

    // ===== ĐỌ THỊ & ĐẤT NỀN =====
    {
        id: 19,
        name: "Vinhomes Central Park",
        province: "TP. Hồ Chí Minh",
        address: "208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh",
        investor: "Vingroup",
        year: "2016",
        scale: "1.200.000 m²",
        description: "Khu đô thị cao cấp với căn hộ và tiện ích đẳng cấp",
        budget: "1 tỷ USD",
        status: "completed",
        lat: 10.7917,
        lng: 106.7211,
        type: "commercial",
        images: []
    },
    {
        id: 20,
        name: "Ecopark Hưng Yên",
        province: "Hưng Yên",
        address: "Xã Xuân Quan, Huyện Văn Giang",
        investor: "Tập đoàn Ecopark",
        year: "2013",
        scale: "4.900.000 m²",
        description: "Khu đô thị sinh thái lớn nhất Bắc Bộ",
        budget: "800 triệu USD",
        status: "completed",
        lat: 20.9581,
        lng: 105.9347,
        type: "commercial",
        images: []
    },
    {
        id: 21,
        name: "Phú Mỹ Hưng - Sài Gòn",
        province: "TP. Hồ Chí Minh",
        address: "Quận 7, TP. Hồ Chí Minh",
        investor: "Công ty Phú Mỹ Hưng",
        year: "1997",
        scale: "4.500.000 m²",
        description: "Khu đô thị hiện đại tiên phong của Sài Gòn",
        budget: "1.2 tỷ USD",
        status: "completed",
        lat: 10.7295,
        lng: 106.7058,
        type: "commercial",
        images: []
    },

    // ===== VĂN HÓA & GIÁO DỤC =====
    {
        id: 22,
        name: "Trường Đại học FPT",
        province: "Hà Nội",
        address: "Khu CNC Hòa Lạc, Huyện Thạch Thất",
        investor: "Tập đoàn FPT",
        year: "2006",
        scale: "100.000 m²",
        description: "Trường Đại học FPT - Khu CNC Hòa Lạc",
        budget: "150 triệu USD",
        status: "completed",
        lat: 21.0065,
        lng: 105.5264,
        type: "commercial",
        images: []
    },
    {
        id: 23,
        name: "Bảo tàng Hà Nội",
        province: "Hà Nội",
        address: "Đường Phạm Hùng, P. Mễ Trì, Q. Nam Từ Liêm",
        investor: "UBND TP. Hà Nội",
        year: "2010",
        scale: "54.000 m²",
        description: "Bảo tàng hiện đại thể hiện lịch sử Thủ Đô",
        budget: "200 triệu USD",
        status: "completed",
        lat: 21.0167,
        lng: 105.7833,
        type: "commercial",
        images: []
    },
    {
        id: 24,
        name: "Nhà hát Lớn Hà Nội",
        province: "Hà Nội",
        address: "Số 1 Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm",
        investor: "Bộ Văn hóa Thể thao",
        year: "2018",
        scale: "12.000 m²",
        description: "Nhà hát cổ kính được cải tạo bền vững",
        budget: "50 triệu USD",
        status: "completed",
        lat: 21.0245,
        lng: 105.8572,
        type: "commercial",
        images: []
    },

    // ===== Y TẾ =====
    {
        id: 25,
        name: "Vinmec Times City Hà Nội",
        province: "Hà Nội",
        address: "458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng",
        investor: "Vingroup",
        year: "2012",
        scale: "85.000 m²",
        description: "Bệnh viện đa khoa quốc tế hiện đại",
        budget: "300 triệu USD",
        status: "completed",
        lat: 20.9958,
        lng: 105.8714,
        type: "commercial",
        images: []
    },
    {
        id: 26,
        name: "Bệnh viện Chợ Rẫy TPHCM",
        province: "TP. Hồ Chí Minh",
        address: "201B Nguyễn Chí Thanh, P. 12, Q. 5",
        investor: "Bộ Y tế",
        year: "2014",
        scale: "110.000 m²",
        description: "Bệnh viện công lập lớn nhất TPHCM",
        budget: "200 triệu USD",
        status: "completed",
        lat: 10.7589,
        lng: 106.6603,
        type: "commercial",
        images: []
    },

    // ===== NĂNG LƯỢNG =====
    {
        id: 27,
        name: "Nhà máy Thủy điện Sơn La",
        province: "Sơn La",
        address: "Xã Ít Ong, Huyện Mường La",
        investor: "EVN",
        year: "2012",
        scale: "10.260.000 m²",
        description: "Nhà máy thủy điện lớn nhất Việt Nam",
        budget: "2.3 tỷ USD",
        status: "completed",
        lat: 21.4833,
        lng: 103.9667,
        type: "industrial",
        images: []
    },
    // ===== CẢNG BIỂN =====
    {
        id: 31,
        name: "Cảng Hải Phòng",
        province: "Hải Phòng",
        address: "Quận Hồng Bàng, TP. Hải Phòng",
        investor: "Cảng Hải Phòng",
        year: "2018",
        scale: "2.500.000 m²",
        description: "Cảng biển hiện đại phục vụ quốc tế",
        budget: "2 tỷ USD",
        status: "completed",
        lat: 20.8569,
        lng: 106.6833,
        type: "industrial",
        images: []
    },

    // ===== RESORT & DU LỊCH =====
    {
        id: 33,
        name: "InterContinental Danang",
        province: "Đà Nẵng",
        address: "Bán đảo Sơn Trà, P. Thọ Quang, Q. Sơn Trà",
        investor: "Sun Group",
        year: "2012",
        scale: "350.000 m²",
        description: "Resort 5 sao lớp thế giới tại Đà Nẵng",
        budget: "300 triệu USD",
        status: "completed",
        lat: 16.1264,
        lng: 108.2778,
        type: "commercial",
        images: []
    },

    // ===== HẠNG Mục KHÁC =====
    {
        id: 35,
        name: "Bitexco Financial Tower",
        province: "TP. Hồ Chí Minh",
        address: "2 Hải Triều, P. Bến Nghé, Quận 1",
        investor: "Bitexco Group",
        year: "2010",
        scale: "100.000 m²",
        description: "Tòa tháp văn phòng cao cấp tại trung tâm thành phố",
        budget: "400 triệu USD",
        status: "completed",
        lat: 10.7718,
        lng: 106.7042,
        type: "commercial",
        images: []
    }
];

// Chuẩn hóa dữ liệu projects (đảm bảo id và images)
(function normalizeProjectsData() {
    let maxId = 0;
    projectsData.forEach((p, idx) => {
        if (!p.id) {
            p.id = ++maxId;
        } else {
            maxId = Math.max(maxId, p.id);
        }
        if (!Array.isArray(p.images)) {
            p.images = [];
        }
    });
    console.log('✓ Projects data normalized:', projectsData.length, 'projects');
})();

// Dữ liệu projects - CẬP NHẬT THÊM IMAGES
const projectsDataOld = [{
        id: 1,
        name: "Landmark 81",
        province: "TP. Hồ Chí Minh",
        address: "720A Điện Biên Phủ, P. 22, Q. Bình Thạnh",
        investor: "Vingroup",
        year: "2018",
        scale: "241.000 m²",
        lat: 10.7951,
        lng: 106.7219,
        type: "commercial",
        images: [] // Mảng ảnh rỗng ban đầu
    }, {
        id: 2,
        name: "Vincom Center Đồng Khởi",
        province: "TP. Hồ Chí Minh",
        address: "72 Lê Thánh Tôn, P. Bến Nghé, Quận 1",
        investor: "Vingroup",
        year: "2010",
        scale: "120.000 m²",
        lat: 10.7792,
        lng: 106.7035,
        type: "commercial",
        images: []
    },
    {
        id: 3,
        name: "Tòa nhà Lotte Center Hà Nội",
        province: "Hà Nội",
        address: "54 Liễu Giai, P. Cống Vị, Quận Ba Đình",
        investor: "Lotte Group",
        year: "2014",
        scale: "170.000 m²",
        lat: 21.0365,
        lng: 105.8146,
        type: "commercial",
        images: [, ]
    },
    {
        id: 4,
        name: "Trung tâm Thương mại AEON MALL Bình Tân",
        province: "TP. Hồ Chí Minh",
        address: "Số 1 Đường 17A, P. Bình Trị Đông B, Q. Bình Tân",
        investor: "AEON Group",
        year: "2016",
        scale: "140.000 m²",
        lat: 10.7639,
        lng: 106.6094,
        type: "commercial",
        images: []
    },
    {
        id: 5,
        name: "Tòa nhà Vietcombank Tower",
        province: "TP. Hồ Chí Minh",
        address: "5 Công Trường Mê Linh, P. Bến Nghé, Quận 1",
        investor: "Vietcombank",
        year: "2010",
        scale: "85.000 m²",
        lat: 10.7823,
        lng: 106.7052,
        type: "commercial"
    },

    // CÔNG TRÌNH GIAO THÔNG
    {
        name: "Cầu Thuận Phước",
        province: "Đà Nẵng",
        address: "Nối Q. Hải Châu với Q. Sơn Trà",
        investor: "Bộ Giao thông Vận tải",
        year: "2009",
        scale: "1.850 m (dài)",
        lat: 16.0825,
        lng: 108.2208,
        type: "transport"
    },
    {
        id: 6,
        name: "Hầm đường bộ Hải Vân",
        province: "Thừa Thiên Huế - Đà Nẵng",
        address: "Đèo Hải Vân, giáp ranh Huế - Đà Nẵng",
        investor: "Bộ Giao thông Vận tải",
        year: "2005",
        scale: "6.280 m (dài)",
        lat: 16.1994,
        lng: 108.1069,
        type: "transport"
    },
    {
        id: 7,
        name: "Cầu Bãi Cháy",
        province: "Quảng Ninh",
        address: "Nối TP. Hạ Long với TP. Cẩm Phả",
        investor: "Bộ Giao thông Vận tải",
        year: "2006",
        scale: "903 m (dài)",
        lat: 20.9608,
        lng: 107.0739,
        type: "transport"
    },
    {
        id: 8,
        name: "Sân bay Quốc tế Long Thành",
        province: "Đồng Nai",
        address: "Huyện Long Thành, Tỉnh Đồng Nai",
        investor: "ACV",
        year: "2025",
        scale: "5.000 ha",
        lat: 10.7754,
        lng: 107.0593,
        type: "transport"
    },

    // CÔNG TRÌNH CÔNG NGHIỆP
    {
        id: 9,
        name: "Nhà máy Ô tô Thành Công",
        province: "Ninh Bình",
        address: "Khu công nghiệp Gián Khẩu, Huyện Gia Viễn",
        investor: "Tập đoàn Thành Công",
        year: "2019",
        scale: "1.200.000 m²",
        lat: 20.3256,
        lng: 105.8972,
        type: "industrial"
    },
    {
        id: 10,
        name: "Khu liên hợp gang thép Hòa Phát Dung Quất",
        province: "Quảng Ngãi",
        address: "Khu kinh tế Dung Quất, Huyện Bình Sơn",
        investor: "Tập đoàn Hòa Phát",
        year: "2020",
        scale: "3.300.000 m²",
        lat: 15.4028,
        lng: 108.8014,
        type: "industrial"
    },
    {
        name: "Nhà máy Điện tử Samsung Thái Nguyên",
        province: "Thái Nguyên",
        address: "Khu công nghiệp Yên Bình, TP. Phổ Yên",
        investor: "Samsung Electronics",
        year: "2014",
        scale: "1.100.000 m²",
        lat: 21.4567,
        lng: 105.8642,
        type: "industrial"
    },
    {
        name: "Nhà máy Sản xuất Ô tô Hyundai Thành Công",
        province: "Ninh Bình",
        address: "Khu công nghiệp Khánh Phú, Huyện Yên Khánh",
        investor: "Hyundai - Thành Công",
        year: "2020",
        scale: "1.500.000 m²",
        lat: 20.1894,
        lng: 106.0458,
        type: "industrial"
    },

    // CÔNG TRÌNH HẠ TẦNG ĐÔ THỊ
    {
        name: "Khu đô thị Vinhomes Central Park",
        province: "TP. Hồ Chí Minh",
        address: "208 Nguyễn Hữu Cảnh, P. 22, Q. Bình Thạnh",
        investor: "Vingroup",
        year: "2016",
        scale: "1.200.000 m²",
        lat: 10.7917,
        lng: 106.7211,
        type: "commercial"
    },
    {
        name: "Khu đô thị Ecopark",
        province: "Hưng Yên",
        address: "Xã Xuân Quan, Huyện Văn Giang",
        investor: "Tập đoàn Ecopark",
        year: "2013",
        scale: "4.900.000 m²",
        lat: 20.9581,
        lng: 105.9347,
        type: "commercial"
    },
    {
        name: "Khu đô thị Phú Mỹ Hưng",
        province: "TP. Hồ Chí Minh",
        address: "Quận 7, TP. Hồ Chí Minh",
        investor: "Công ty Phú Mỹ Hưng",
        year: "1997",
        scale: "4.500.000 m²",
        lat: 10.7295,
        lng: 106.7058,
        type: "commercial"
    },

    // CÔNG TRÌNH VĂN HÓA - GIÁO DỤC
    {
        name: "Trường Đại học FPT",
        province: "Hà Nội",
        address: "Khu CNC Hòa Lạc, Huyện Thạch Thất",
        investor: "Tập đoàn FPT",
        year: "2006",
        scale: "100.000 m²",
        lat: 21.0065,
        lng: 105.5264,
        type: "commercial"
    },
    {
        name: "Bảo tàng Hà Nội",
        province: "Hà Nội",
        address: "Đường Phạm Hùng, P. Mễ Trì, Q. Nam Từ Liêm",
        investor: "UBND TP. Hà Nội",
        year: "2010",
        scale: "54.000 m²",
        lat: 21.0167,
        lng: 105.7833,
        type: "commercial"
    },
    {
        name: "Nhà hát lớn Hà Nội (Cải tạo)",
        province: "Hà Nội",
        address: "Số 1 Tràng Tiền, P. Tràng Tiền, Q. Hoàn Kiếm",
        investor: "Bộ Văn hóa Thể thao và Du lịch",
        year: "2018",
        scale: "12.000 m²",
        lat: 21.0245,
        lng: 105.8572,
        type: "commercial"
    },

    // CÔNG TRÌNH Y TẾ
    {
        name: "Bệnh viện Đa khoa Quốc tế Vinmec Times City",
        province: "Hà Nội",
        address: "458 Minh Khai, P. Vĩnh Tuy, Q. Hai Bà Trưng",
        investor: "Vingroup",
        year: "2012",
        scale: "85.000 m²",
        lat: 20.9958,
        lng: 105.8714,
        type: "commercial"
    },
    {
        name: "Bệnh viện Chợ Rẫy (Cải tạo)",
        province: "TP. Hồ Chí Minh",
        address: "201B Nguyễn Chí Thanh, P. 12, Q. 5",
        investor: "Bộ Y tế",
        year: "2014",
        scale: "110.000 m²",
        lat: 10.7589,
        lng: 106.6603,
        type: "commercial"
    },
    {
        name: "Bệnh viện Nhi đồng Thành phố",
        province: "TP. Hồ Chí Minh",
        address: "15 Võ Trần Chí, Xã Tân Kiên, Huyện Bình Chánh",
        investor: "UBND TP. Hồ Chí Minh",
        year: "2013",
        scale: "65.000 m²",
        lat: 10.7361,
        lng: 106.5697,
        type: "commercial"
    },

    // CÔNG TRÌNH NĂNG LƯỢNG
    {
        name: "Nhà máy Thủy điện Sơn La",
        province: "Sơn La",
        address: "Xã Ít Ong, Huyện Mường La",
        investor: "EVN",
        year: "2012",
        scale: "10.260.000 m²",
        lat: 21.4833,
        lng: 103.9667,
        type: "industrial"
    },
    {
        name: "Nhà máy Nhiệt điện Vĩnh Tân 4",
        province: "Bình Thuận",
        address: "Xã Vĩnh Tân, Huyện Tuy Phong",
        investor: "EVN",
        year: "2021",
        scale: "1.200.000 m²",
        lat: 11.1347,
        lng: 108.6458,
        type: "industrial"
    },
    {
        name: "Trang trại Điện gió Bạc Liêu",
        province: "Bạc Liêu",
        address: "Xã Vĩnh Trạch Đông, TP. Bạc Liêu",
        investor: "Công ty CP Năng lượng Tái tạo",
        year: "2013",
        scale: "1.300 ha",
        lat: 9.2564,
        lng: 105.7347,
        type: "industrial"
    },

    // CÔNG TRÌNH CẢNG BIỂN
    {
        name: "Cảng Container Cái Mép - Thị Vải",
        province: "Bà Rịa - Vũng Tàu",
        address: "Huyện Tân Thành, Tỉnh Bà Rịa - Vũng Tàu",
        investor: "Tổng công ty Hàng hải Việt Nam",
        year: "2011",
        scale: "1.800.000 m²",
        lat: 10.5678,
        lng: 107.0456,
        type: "industrial"
    },
    {
        name: "Cảng Hải Phòng (Cải tạo)",
        province: "Hải Phòng",
        address: "Quận Hồng Bàng, TP. Hải Phòng",
        investor: "Tổng công ty Cảng Hải Phòng",
        year: "2018",
        scale: "2.500.000 m²",
        lat: 20.8569,
        lng: 106.6833,
        type: "industrial"
    },

    // CÔNG TRÌNH THỦY LỢI
    {
        name: "Hồ chứa nước Sông Sắt",
        province: "Ninh Thuận",
        address: "Xã Phước Hà, Huyện Thuận Nam",
        investor: "Bộ Nông nghiệp và PTNT",
        year: "2019",
        scale: "1.500 ha",
        lat: 11.4567,
        lng: 108.9234,
        type: "industrial"
    },
    {
        name: "Cầu Rồng",
        province: "Đà Nẵng",
        address: "Đường Nguyễn Văn Linh, P. Phước Ninh, Q. Hải Châu",
        investor: "UBND TP. Đà Nẵng",
        year: "2013",
        scale: "1.050 m (dài)",
        lat: 16.0617,
        lng: 108.2274,
        type: "transport"
    }, {
        name: "Cầu Nhật Tân",
        province: "Hà Nội",
        address: "P. Phú Thượng, Q. Tây Hồ (nối H. Đông Anh)",
        investor: "Bộ GTVT",
        year: "2015",
        scale: "2.500 m (dài)",
        lat: 21.0827,
        lng: 105.8159,
        type: "transport"
    }, {
        name: "Nhà máy VinFast",
        province: "Hải Phòng",
        address: "Đảo Cát Hải, Khu kinh tế Đình Vũ – Cát Hải",
        investor: "Vingroup",
        year: "2019",
        scale: "3.350.000 m²",
        lat: 20.8197,
        lng: 106.8770,
        type: "industrial"
    }, {
        name: "Cầu Cần Thơ",
        province: "Cần Thơ",
        address: "Q. Cái Răng (nối tỉnh Vĩnh Long)",
        investor: "Bộ GTVT",
        year: "2010",
        scale: "2.750 m (dài)",
        lat: 10.0416,
        lng: 105.7997,
        type: "transport"
    },
    {
        name: "Bitexco Financial Tower",
        province: "TP. Hồ Chí Minh",
        address: "2 Hải Triều, P. Bến Nghé, Quận 1",
        investor: "Bitexco Group",
        year: "2010",
        scale: "100.000 m²",
        lat: 10.7718,
        lng: 106.7042,
        type: "commercial"
    }, {
        name: "Nhà máy Lọc dầu Dung Quất",
        province: "Quảng Ngãi",
        address: "Xã Bình Thuận, H. Bình Sơn, KKT Dung Quất",
        investor: "BSR (Petrovietnam)",
        year: "2009",
        scale: "8.200.000 m²",
        lat: 15.3800,
        lng: 108.7845,
        type: "industrial"
    }, {
        name: "Sân bay Quốc tế Vân Đồn",
        province: "Quảng Ninh",
        address: "Xã Đoàn Kết, H. Vân Đồn",
        investor: "Sun Group",
        year: "2018",
        scale: "3.250.000 m²",
        lat: 21.1118,
        lng: 107.4130,
        type: "transport"
    }, {
        name: "InterContinental Danang",
        province: "Đà Nẵng",
        address: "Bán đảo Sơn Trà, P. Thọ Quang, Q. Sơn Trà",
        investor: "Sun Group",
        year: "2012",
        scale: "350.000 m²",
        lat: 16.1264,
        lng: 108.2778,
        type: "commercial"
    }
];
// State management - THÊM TRẠNG THÁI THEME
const state = {
    currentSelectedProvince: null,
    isMapMoving: false,
    tooltip: null,
    markers: [],
    searchTimeout: null,
    currentTheme: 'light', // 'light', 'dark', 'auto'
    filteredProjects: [...projectsData],
    activeFilters: {
        types: [],
        yearFrom: null,
        yearTo: null,
        province: ''
    },
    mapStyle: 'satellite', // 'satellite', 'light', 'dark', 'street'
    imageManager: new ImageManager(), // THÊM IMAGE MANAGER
    hoveredProvince: null // Thêm biến theo dõi hover vào state (nếu đã có state, chỉ thêm thuộc tính)
};

// Utility functions
const utils = {
    getColorByType: (type) => CONFIG.COLORS[type] || CONFIG.COLORS.default,

    getTypeName: (type) => CONFIG.PROJECT_TYPES[type] || CONFIG.PROJECT_TYPES.default,

    debounce: (func, wait) => {
        return (...args) => {
            clearTimeout(state.searchTimeout);
            state.searchTimeout = setTimeout(() => func.apply(null, args), wait);
        };
    },

    safeQuerySelector: (selector) => {
        const element = document.querySelector(selector);
        if (!element) {
            console.warn(`Element not found: ${selector}`);
        }
        return element;
    },

    getProvinceName: (provinceName) => provinceName.split(',')[0].trim()
};

// Map Layer Management
const mapLayers = {
    addProvincesLayer: function() {
        if (map.getSource('vietnam-provinces')) return;

        map.addSource('vietnam-provinces', {
            'type': 'geojson',
            'data': vietnamProvincesGeoJSON,
            'generateId': true // <<< quan trọng để mapbox cấp feature.id tự động
        });

        // Fill layer
        map.addLayer({
            'id': 'provinces-fill',
            'type': 'fill',
            'source': 'vietnam-provinces',
            'paint': {
                // highlight khi hover/selected
                'fill-color': [
                    'case', ['boolean', ['feature-state', 'selected'], false], '#e74c3c', ['boolean', ['feature-state', 'hover'], false], '#74b9ff',
                    '#667eea'
                ],
                'fill-opacity': [
                    'case', ['boolean', ['feature-state', 'selected'], false], 0.6, ['boolean', ['feature-state', 'hover'], false], 0.45,
                    0.15
                ],
                'fill-outline-color': '#2c3e50'
            }
        });

        // Border layer (đổi màu và độ dày khi hover/selected)
        map.addLayer({
            'id': 'provinces-border',
            'type': 'line',
            'source': 'vietnam-provinces',
            'paint': {
                'line-color': [
                    'case', ['boolean', ['feature-state', 'selected'], false], '#c0392b', ['boolean', ['feature-state', 'hover'], false], '#ffd54f', // màu sáng khi hover
                    '#2c3e50'
                ],
                'line-width': [
                    'case', ['boolean', ['feature-state', 'selected'], false], 5, ['boolean', ['feature-state', 'hover'], false], 4,
                    2.5
                ],
                'line-opacity': [
                    'case', ['boolean', ['feature-state', 'selected'], false], 1, ['boolean', ['feature-state', 'hover'], false], 1,
                    0.9
                ],
                'line-join': 'round',
                'line-cap': 'round'
            }
        });

        // Optional: nhãn tỉnh
        map.addLayer({
            'id': 'province-labels',
            'type': 'symbol',
            'source': 'vietnam-provinces',
            'layout': {
                'text-field': ['get', 'ten_tinh'],
                'text-font': ['Segoe UI Bold', 'Arial Unicode MS Bold'],
                'text-size': 11,
                'text-allow-overlap': false
            },
            'paint': {
                'text-color': '#2c3e50',
                'text-halo-color': '#ffffff',
                'text-halo-width': 2
            }
        });
    },

    setupProvinceInteractions: function() {
        // Hover effects - sử dụng feature.id (generateId:true)
        map.on('mousemove', 'provinces-fill', (e) => {
            if (state.isMapMoving || !e.features.length) return;

            const province = e.features[0];
            const fid = province.id;

            // unset hover state trước đó (nếu khác)
            if (state.hoveredProvince !== null && state.hoveredProvince !== fid) {
                map.setFeatureState({ source: 'vietnam-provinces', id: state.hoveredProvince }, { hover: false });
            }

            // set hover cho feature hiện tại
            map.setFeatureState({ source: 'vietnam-provinces', id: fid }, { hover: true });
            state.hoveredProvince = fid;

            this.showProvinceTooltip(e, province);

            // con trỏ chuột
            map.getCanvas().style.cursor = 'pointer';
        });

        map.on('mouseleave', 'provinces-fill', () => {
            // unset hover
            if (state.hoveredProvince !== null) {
                map.setFeatureState({ source: 'vietnam-provinces', id: state.hoveredProvince }, { hover: false });
                state.hoveredProvince = null;
            }
            this.hideProvinceTooltip();
            map.getCanvas().style.cursor = '';
        });

        // Click effects (giữ nguyên)
        map.on('click', 'provinces-fill', (e) => {
            if (!e.features.length) return;
            const province = e.features[0];
            this.selectProvince(province);
            provinceInfo.showProvinceInfo(province.properties);
        });

        this.setupPaintProperties();
    },

    setupPaintProperties: function() {
        if (!map.getSource('vietnam-provinces')) return;

        map.setPaintProperty('provinces-fill', 'fill-opacity', [
            'case', ['boolean', ['feature-state', 'hover'], false], 0.45, ['boolean', ['feature-state', 'selected'], false], 0.6,
            0.15
        ]);

        map.setPaintProperty('provinces-fill', 'fill-color', [
            'case', ['boolean', ['feature-state', 'selected'], false], '#e74c3c', ['boolean', ['feature-state', 'hover'], false], '#74b9ff',
            '#667eea'
        ]);

        map.setPaintProperty('provinces-border', 'line-width', [
            'case', ['boolean', ['feature-state', 'selected'], false], 5, ['boolean', ['feature-state', 'hover'], false], 4,
            2.5
        ]);

        map.setPaintProperty('provinces-border', 'line-color', [
            'case', ['boolean', ['feature-state', 'selected'], false], '#c0392b', ['boolean', ['feature-state', 'hover'], false], '#ffd54f',
            '#2c3e50'
        ]);

        map.setPaintProperty('provinces-border', 'line-opacity', [
            'case', ['boolean', ['feature-state', 'selected'], false], 1, ['boolean', ['feature-state', 'hover'], false], 1,
            0.9
        ]);
    },

    showProvinceTooltip(e, province) {
        if (!state.tooltip) return;

        const provinceName = province.properties.ten_tinh;
        const provinceProjects = this.getProjectsByProvince(provinceName);
        const projectCount = provinceProjects.length;

        let projectCategory = "0";
        if (projectCount > 0 && projectCount <= 5) {
            projectCategory = "1-5";
        } else if (projectCount > 5) {
            projectCategory = "6+";
        }

        state.tooltip.innerHTML = `
            <div class="tooltip-header">
                <strong>${provinceName}</strong>
            </div>
            <div class="tooltip-stats">
                <div class="tooltip-stat">
                    <span class="tooltip-label">Diện tích:</span>
                    <span class="tooltip-value">${province.properties.dtich_km2.toLocaleString()} km²</span>
                </div>
                <div class="tooltip-stat">
                    <span class="tooltip-label">Dân số:</span>
                    <span class="tooltip-value">${(province.properties.dan_so / 1000000).toFixed(2)} triệu</span>
                </div>
            </div>
            <div class="tooltip-projects">
                <i class="fas fa-hard-hat" style="color: ${projectCount > 0 ? '#2ecc71' : '#95a5a6'}; margin-right: 5px;"></i>
                <span class="project-count ${projectCount > 0 ? 'has-projects' : 'no-projects'}">
                    ${projectCount} công trình trong tỉnh
                </span>
            </div>
        `;

        state.tooltip.setAttribute('data-project-count', projectCategory);
        state.tooltip.style.display = 'block';
        state.tooltip.style.left = `${e.point.x}px`;
        state.tooltip.style.top = `${e.point.y - 10}px`;
    },

    getProjectsByProvince(provinceName) {
        const cleanProvinceName = utils.getProvinceName(provinceName);
        return projectsData.filter(project =>
            project.province.includes(cleanProvinceName)
        );
    },

    hideProvinceTooltip() {
        if (state.tooltip) {
            state.tooltip.style.display = 'none';
        }
    },

    clearHoverEffects() {
        if (map.getSource('vietnam-provinces')) {
            // Sử dụng biến global từ Codebando.js
            vietnamProvincesGeoJSON.features.forEach((_, index) => {
                map.setFeatureState({ source: 'vietnam-provinces', id: index }, { hover: false });
            });
        }
    },

    selectProvince(provinceFeature) {
        // Remove previous selection
        if (state.currentSelectedProvince !== null) {
            map.setFeatureState({
                source: 'vietnam-provinces',
                id: state.currentSelectedProvince
            }, { selected: false });
        }

        // Set new selection
        state.currentSelectedProvince = provinceFeature.id;
        map.setFeatureState({
            source: 'vietnam-provinces',
            id: provinceFeature.id
        }, { selected: true });

        // Fly to province
        this.flyToProvince(provinceFeature);
    },

    flyToProvince(provinceFeature) {
        const bounds = new mapboxgl.LngLatBounds();
        const coordinates = provinceFeature.geometry.coordinates;

        const processCoordinates = (coords) => {
            coords.forEach(coord => {
                if (Array.isArray(coord[0])) {
                    processCoordinates(coord);
                } else {
                    bounds.extend(coord);
                }
            });
        };

        processCoordinates(coordinates);

        map.fitBounds(bounds, {
            padding: 50,
            duration: 1500,
            essential: true
        });
    },

    clearProvinceSelection() {
        if (state.currentSelectedProvince !== null) {
            map.setFeatureState({
                source: 'vietnam-provinces',
                id: state.currentSelectedProvince
            }, { selected: false });
            state.currentSelectedProvince = null;
        }
    }
};
// ...existing code...

// ===== HEATMAP VISUALIZATION MANAGER =====
const heatmapManager = {
    sourceId: 'projects-heatmap',
    layerId: 'projects-heatmap-layer',
    pointLayerId: 'projects-heatmap-point',
    enabled: false,

    buildGeoJSON() {
        const features = projectsData
            .filter(p => typeof p.lat === 'number' && typeof p.lng === 'number' && !isNaN(p.lat) && !isNaN(p.lng))
            .map(p => {
                // weight can be customized (budget, type...). use 1 for now.
                let weight = 1;
                // try to infer numeric budget if available
                if (p.budget) {
                    const num = parseFloat(String(p.budget).replace(/[^\d.]/g, ''));
                    if (!isNaN(num) && num > 0) {
                        weight = Math.min(1, Math.log10(num + 1) / 6); // normalize
                    }
                }
                return {
                    type: 'Feature',
                    properties: { id: p.id, name: p.name, weight },
                    geometry: { type: 'Point', coordinates: [p.lng, p.lat] }
                };
            });

        return { type: 'FeatureCollection', features };
    },

    addHeatmap() {
        if (!window.map || map.getSource(this.sourceId)) return;
        const geo = this.buildGeoJSON();
        map.addSource(this.sourceId, { type: 'geojson', data: geo });

        // heatmap layer
        map.addLayer({
            id: this.layerId,
            type: 'heatmap',
            source: this.sourceId,
            maxzoom: 15,
            paint: {
                // increase weight by property
                'heatmap-weight': ['get', 'weight'],
                // intensity based on zoom
                'heatmap-intensity': ['interpolate', ['linear'],
                    ['zoom'], 0, 0.8, 9, 1.6
                ],
                // radius increases with zoom
                'heatmap-radius': ['interpolate', ['linear'],
                    ['zoom'], 0, 2, 9, 30
                ],
                // color ramp
                'heatmap-color': [
                    'interpolate', ['linear'],
                    ['heatmap-density'],
                    0, 'rgba(33,102,172,0)',
                    0.2, 'rgba(103,169,207,0.6)',
                    0.4, 'rgba(209,229,240,0.7)',
                    0.6, 'rgba(253,219,199,0.8)',
                    0.8, 'rgba(239,138,98,0.9)',
                    1, 'rgba(178,24,43,1)'
                ],
                'heatmap-opacity': 0.9
            }
        }, 'provinces-border'); // insert under province borders when possible

        // add circle layer for points at higher zooms
        map.addLayer({
            id: this.pointLayerId,
            type: 'circle',
            source: this.sourceId,
            minzoom: 10,
            paint: {
                'circle-radius': ['interpolate', ['linear'],
                    ['zoom'], 10, 4, 14, 8
                ],
                'circle-color': '#2c3e50',
                'circle-stroke-color': '#fff',
                'circle-stroke-width': 1,
                'circle-opacity': 0.9
            }
        });

        this.enabled = true;
    },

    removeHeatmap() {
        if (!window.map) return;
        if (map.getLayer(this.layerId)) map.removeLayer(this.layerId);
        if (map.getLayer(this.pointLayerId)) map.removeLayer(this.pointLayerId);
        if (map.getSource(this.sourceId)) map.removeSource(this.sourceId);
        this.enabled = false;
    },

    toggle(checked) {
        if (checked) {
            this.addHeatmap();
        } else {
            this.removeHeatmap();
        }
    },

    refresh() {
        if (!map.getSource(this.sourceId)) return;
        const src = map.getSource(this.sourceId);
        src.setData(this.buildGeoJSON());
    },

    // Recreate heatmap after style change (Mapbox removes layers on style reset)
    ensureAfterStyle() {
        if (this.enabled && !map.getSource(this.sourceId)) {
            this.addHeatmap();
        }
    }
};

// React to map style resets (re-add heatmap if previously enabled)
map.on && map.on('styledata', () => {
    heatmapManager.ensureAfterStyle();
});

// Hook heatmap checkbox
document.addEventListener('DOMContentLoaded', () => {
    const heatCheckbox = document.getElementById('heatmapLayer');
    if (heatCheckbox) {
        heatCheckbox.addEventListener('change', (e) => {
            heatmapManager.toggle(e.target.checked);
        });
    }
});

// When projects data change (add/remove), refresh heatmap if active
const originalPush = projectsData.push.bind(projectsData);
projectsData.push = function(...args) {
    const res = originalPush(...args);
    heatmapManager.refresh();
    return res;
};

// ...existing code...
// Markers Management
const markersManager = {
    addProjectMarkers() {
        // Clear existing markers first
        this.clearMarkers();

        projectsData.forEach(project => {
            const marker = this.createMarker(project);
            state.markers.push(marker);
        });
    },

    createMarker(project) {
        const el = document.createElement('div');
        el.className = 'project-marker';
        Object.assign(el.style, {
            width: '15px',
            height: '15px',
            borderRadius: '50%',
            backgroundColor: utils.getColorByType(project.type),
            border: '2px solid white',
            cursor: 'pointer',
            boxShadow: '0 2px 5px rgba(0,0,0,0.3)',
            transition: 'all 0.3s ease'
        });

        // Add hover effects
        el.addEventListener('mouseenter', () => {
            el.style.transform = 'scale(1.3)';
            el.style.zIndex = '1000';
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = 'scale(1)';
            el.style.zIndex = 'auto';
        });

        // Create popup content
        const popup = new mapboxgl.Popup({ offset: 25 })
            .setHTML(this.createPopupContent(project));

        // Create marker
        const marker = new mapboxgl.Marker(el)
            .setLngLat([project.lng, project.lat])
            .setPopup(popup)
            .addTo(map);

        // Add click event
        el.addEventListener('click', (e) => {
            e.stopPropagation();
            projectInfo.showProjectInfo(project);
        });

        return marker;
    },

    createPopupContent(project) {
        return `
            <div class="popup-content">
                <h3>${project.name}</h3>
                <p><strong>Tỉnh:</strong> ${project.province}</p>
                <p><strong>Năm:</strong> ${project.year}</p>
                <p><strong>Loại:</strong> ${utils.getTypeName(project.type)}</p>
            </div>
        `;
    },

    clearMarkers() {
        state.markers.forEach(marker => marker.remove());
        state.markers = [];
    },

    toggleMarkersVisibility(visible) {
        state.markers.forEach(marker => {
            marker.getElement().style.display = visible ? 'block' : 'none';
        });
    }
};

// Projects List Management - CẬP NHẬT
const projectsListManager = {
        populateProjectsList() {
            const projectsList = utils.safeQuerySelector('#projectsList');
            if (!projectsList) return;

            projectsList.innerHTML = '';

            projectsData.forEach((project, index) => {
                const projectItem = this.createProjectItem(project, index);
                projectsList.appendChild(projectItem);
            });
        },

        createProjectItem(project, index) {
            const projectItem = document.createElement('div');
            projectItem.className = 'project-item';

            const thumbnail = state.imageManager.getThumbnail(project.id);
            const imageCount = state.imageManager.getImageCount(project.id);
            const thumbnailHTML = thumbnail ?
                `<img src="${thumbnail}" alt="${project.name}" class="project-thumbnail">
               ${imageCount > 1 ? `<span class="image-count">${imageCount}</span>` : ''}`
            : `<div class="project-thumbnail placeholder">
                 <i class="fas fa-image"></i>
               </div>`;

        projectItem.innerHTML = `
            <div class="project-thumbnail-wrapper">
                ${thumbnailHTML}
            </div>
            <div class="project-content">
                <div class="project-name">${project.name}</div>
                <div class="project-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${project.province}
                </div>
                <div class="project-details">
                    <span class="project-type">${utils.getTypeName(project.type)}</span>
                    <span class="project-year">${project.year}</span>
                </div>
                <div class="project-actions">
                    <button class="project-action-btn view-details" data-project-id="${project.id}">
                        <i class="fas fa-eye"></i> Xem
                    </button>
                    <button class="project-action-btn add-images" data-project-id="${project.id}">
                        <i class="fas fa-image"></i> Ảnh
                    </button>
                </div>
            </div>
        `;

        // View details button
        projectItem.querySelector('.view-details')?.addEventListener('click', (e) => {
            e.stopPropagation();
            projectInfo.showProjectInfo(project);
        });

        // Add images button
        projectItem.querySelector('.add-images')?.addEventListener('click', (e) => {
            e.stopPropagation();
            imageUI.openImageManager(project);
        });

        return projectItem;
    },

    handleProjectItemClick(projectItem, project) {
        document.querySelectorAll('.project-item').forEach(item => {
            item.classList.remove('active');
        });

        projectItem.classList.add('active');
        projectInfo.showProjectInfo(project);
        map.flyTo({
            center: [project.lng, project.lat],
            zoom: 12,
            essential: true
        });
    },

    filterProjects(searchTerm) {
        const projectItems = document.querySelectorAll('.project-item');

        projectItems.forEach(item => {
            const projectName = item.querySelector('.project-name').textContent.toLowerCase();
            const projectLocation = item.querySelector('.project-location').textContent.toLowerCase();
            const shouldShow = projectName.includes(searchTerm) || projectLocation.includes(searchTerm);

            item.style.display = shouldShow ? 'block' : 'none';
        });
    }
};

// ====== IMAGE UI MANAGER ======
const imageUI = {
    openImageManager(project) {
        const modal = utils.safeQuerySelector('#imageModal');
        if (!modal) return;

        this.currentProject = project;
        this.populateImageGallery(project.id);
        modal.style.display = 'flex';
        modal.classList.add('show');
    },

    closeImageManager() {
        const modal = utils.safeQuerySelector('#imageModal');
        if (modal) {
            modal.classList.remove('show');
            setTimeout(() => {
                modal.style.display = 'none';
            }, 300);
        }
    },

    populateImageGallery(projectId) {
        const gallery = utils.safeQuerySelector('#imageGalleryContainer'); // ✅ Sửa từ #imageGallery
        if (!gallery) return console.error('#imageGalleryContainer missing');
        
        const imgs = state.imageManager.getProjectImages(projectId);
        gallery.innerHTML = '';
        
        if (!imgs.length) {
            gallery.innerHTML = `
                <div class="empty-gallery">
                    <i class="fas fa-image"></i>
                    <p>Chưa có ảnh cho dự án này</p>
                </div>
            `;
            return;
        }

        imgs.forEach((img, idx) => {
            const div = document.createElement('div');
            div.className = 'image-gallery-item';
            div.innerHTML = `
                <div class="image-wrapper">
                    <img src="${img.url}" alt="${img.name}">
                    <div class="image-overlay">
                        <button class="delete-image-btn" data-id="${img.id}">
                            <i class="fas fa-trash"></i>
                        </button>
                    </div>
                </div>
                <div class="image-info">
                    <p class="image-name" title="${img.name}">${img.name}</p>
                    <p class="image-date">${img.uploadedAt}</p>
                </div>
            `;
            gallery.appendChild(div);
            
            div.querySelector('.delete-image-btn')?.addEventListener('click', (e) => {
                e.stopPropagation();
                if (!confirm('Bạn chắc chắn muốn xóa ảnh này?')) return;
                state.imageManager.removeImage(projectId, img.id);
                this.populateImageGallery(projectId);
                projectsListManager.populateProjectsList();
            });
        });
    },

    handleImageUpload() {
        // sửa selector: index.html dùng id="imageFileInput"
        const fileInput = utils.safeQuerySelector('#imageFileInput');
        const imagePathInput = utils.safeQuerySelector('#imagePath');
        const uploadBtn = utils.safeQuerySelector('#uploadImageBtn');

        if (!fileInput || !imagePathInput || !uploadBtn) {
            console.warn('Upload controls missing (#imageFileInput, #imagePath, #uploadImageBtn)');
            return;
        }

        uploadBtn.addEventListener('click', () => {
            if (!this.currentProject) return alert('Mở modal dự án trước khi thêm ảnh.');
            const imagePath = imagePathInput.value.trim();
            if (!imagePath) return alert('Nhập đường dẫn ảnh hoặc chọn file.');
            const validExt = ['.jpg','.jpeg','.png','.gif','.webp'];
            if (!validExt.some(ext => imagePath.toLowerCase().endsWith(ext))) {
                return alert('Định dạng ảnh không hợp lệ.');
            }
            const imageName = imagePath.split('/').pop().split('\\').pop();
            state.imageManager.addImageToProject(this.currentProject.id, imagePath, imageName);
            this.populateImageGallery(this.currentProject.id);
            projectsListManager.populateProjectsList();
            imagePathInput.value = '';
            alert('Đã thêm ảnh: ' + imageName);
        });

        fileInput.addEventListener('change', (e) => {
            if (!this.currentProject) return alert('Mở modal dự án trước khi thêm ảnh.');
            const file = e.target.files && e.target.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (ev) => {
                state.imageManager.addImageToProject(this.currentProject.id, ev.target.result, file.name);
                this.populateImageGallery(this.currentProject.id);
                projectsListManager.populateProjectsList();
                fileInput.value = '';
                alert('Đã thêm ảnh: ' + file.name);
            };
            reader.onerror = () => alert('Lỗi đọc file');
            reader.readAsDataURL(file);
        });
    }
};

// Info Panels Management - CẬP NHẬT
const projectInfo = {
    showProjectInfo(project) {
        const panel = utils.safeQuerySelector('#projectInfo');
        if (!panel) return;

        this.updateProjectInfoContent(project);

        panel.style.display = 'block';
        panel.style.animation = 'slideUp 0.3s ease forwards';
    },

    updateProjectInfoContent(project) {
        const elements = {
            title: '#projectInfoTitle',
            province: '#infoProvince',
            address: '#infoAddress',
            investor: '#infoInvestor',
            year: '#infoYear',
            scale: '#infoScale',
            coordinates: '#infoCoordinates'
        };

        Object.entries(elements).forEach(([key, selector]) => {
            const element = utils.safeQuerySelector(selector);
            if (element) {
                element.textContent = this.getProjectInfoValue(project, key);
            }
        });

        // Hiển thị ảnh công trình
        this.displayProjectImages(project.id);
    },

    displayProjectImages(projectId) {
        const previewDiv = utils.safeQuerySelector('#imagesPreview'); // index.html uses this id
        const noImagesDiv = utils.safeQuerySelector('#noImagesMessage');
        if (!previewDiv || !noImagesDiv) {
            console.warn('#imagesPreview or #noImagesMessage not found');
            return;
        }

        const imgs = state.imageManager.getProjectImages(projectId);
        previewDiv.innerHTML = '';

        if (!imgs.length) {
            previewDiv.style.display = 'none';
            noImagesDiv.style.display = 'block';
            return;
        }

        noImagesDiv.style.display = 'none';
        previewDiv.style.display = 'grid';

        imgs.forEach((img, idx) => {
            const itemDiv = document.createElement('div');
            itemDiv.className = 'image-preview-item';
            itemDiv.innerHTML = `
                <img src="${img.url}" alt="${img.name}">
                <div class="image-preview-info">${img.name}</div>
            `;
            itemDiv.addEventListener('click', () => imageUI.viewImageFullscreen ? imageUI.viewImageFullscreen({ id: projectId }, idx) : null);
            previewDiv.appendChild(itemDiv);
        });
    },

    getProjectInfoValue(project, key) {
        const values = {
            title: project.name,
            province: project.province,
            address: project.address,
            investor: project.investor,
            year: project.year,
            scale: project.scale,
            coordinates: `${project.lat.toFixed(4)}, ${project.lng.toFixed(4)}`
        };
        return values[key] || '';
    },

    hideProjectInfo() {
        const panel = utils.safeQuerySelector('#projectInfo');
        if (!panel) return;

        panel.style.animation = 'slideDown 0.3s ease forwards';
        setTimeout(() => {
            panel.style.display = 'none';
            panel.style.animation = '';
        }, 300);
    }
};

const provinceInfo = {
    showProvinceInfo(province) {
        const panel = utils.safeQuerySelector('#provinceInfo');
        if (!panel) return;

        this.updateProvinceInfoContent(province);

        panel.style.display = 'block';
        panel.style.animation = 'modalSlideIn 0.3s ease forwards';
    },

    updateProvinceInfoContent(province) {
        const provinceName = utils.getProvinceName(province.ten_tinh);
        const provinceProjects = projectsData.filter(p =>
            p.province.includes(provinceName)
        );

        // Update basic info
        const basicInfo = {
            name: province.ten_tinh,
            projectCount: provinceProjects.length,
            area: province.dtich_km2.toLocaleString(),
            population: (province.dan_so / 1000000).toFixed(2),
            gdp: (province.dtich_km2 * 0.0001).toFixed(2) // Mock GDP data
        };

        Object.entries(basicInfo).forEach(([key, value]) => {
            const element = utils.safeQuerySelector(`#province${key.charAt(0).toUpperCase() + key.slice(1)}`);
            if (element) {
                element.textContent = value;
            }
        });

        // Populate projects list
        this.populateProvinceProjects(provinceProjects);
    },

    populateProvinceProjects(provinceProjects) {
        const projectsList = utils.safeQuerySelector('#provinceProjectsList');
        if (!projectsList) return;

        projectsList.innerHTML = '';

        provinceProjects.forEach(project => {
            const projectEl = document.createElement('div');
            projectEl.className = 'project-item';
            projectEl.innerHTML = `
                <div class="project-name">${project.name}</div>
                <div class="project-location">
                    <i class="fas fa-map-marker-alt"></i>
                    ${project.address}
                </div>
                <div class="project-details">
                    <span class="project-type">${utils.getTypeName(project.type)}</span>
                    <span class="project-year">${project.year}</span>
                </div>
            `;
            projectEl.addEventListener('click', () => projectInfo.showProjectInfo(project));
            projectsList.appendChild(projectEl);
        });
    },

    hideProvinceInfo() {
        const panel = utils.safeQuerySelector('#provinceInfo');
        if (!panel) return;

        panel.style.animation = 'modalSlideOut 0.3s ease forwards';
        setTimeout(() => {
            panel.style.display = 'none';
            panel.style.animation = '';
            mapLayers.clearProvinceSelection();
        }, 300);
    }
};

// UI Controls Management
const uiControls = {
    init() {
        this.setupMapControls();
        this.setupLayerControls();
        this.setupCloseButtons();
        this.setupSearch();
    },

    setupMapControls() {
        const controls = {
            'zoomIn': () => map.zoomIn(),
            'zoomOut': () => map.zoomOut(),
            'resetView': () => this.resetView(),
            'toggleSatellite': (e) => this.toggleSatellite(e),
            'toggleControls': () => this.toggleControls(),
            'openLayers': () => this.showElement('#mapOverlay'),
            'openLegend': () => this.showElement('#legend'),
            'openComparison': () => this.openComparison(),
            'openStats': () => this.openDashboard()  // ← THÊM DÒNG NÀY
        };

        Object.entries(controls).forEach(([id, handler]) => {
            const element = utils.safeQuerySelector(`#${id}`);
            if (element) {
                element.addEventListener('click', handler);
            }
        });
    },

    resetView() {
        mapLayers.clearProvinceSelection();
        map.flyTo({
            center: CONFIG.MAP.center,
            zoom: CONFIG.MAP.zoom,
            essential: true
        });
    },

    toggleSatellite(e) {
        const isSatellite = map.getStyle().name.includes('Satellite');
        map.setStyle(isSatellite ? CONFIG.MAP.styles.light : CONFIG.MAP.styles.satellite);

        if (e.target) {
            e.target.classList.toggle('active', !isSatellite);
        }
    },

    toggleControls() {
        const controls = utils.safeQuerySelector('.map-controls');
        const icon = utils.safeQuerySelector('#toggleControls i');

        if (controls && icon) {
            controls.classList.toggle('controls-collapsed');
            icon.className = controls.classList.contains('controls-collapsed') ?
                'fas fa-chevron-right' :
                'fas fa-chevron-left';
        }
    },

    setupLayerControls() {
        const layerControls = {
            'satelliteLayer': (checked) => {
                const isSatellite = map.getStyle().name.includes('Satellite');
                if (checked && !isSatellite) {
                    map.setStyle(CONFIG.MAP.styles.satellite);
                } else if (!checked && isSatellite) {
                    map.setStyle(CONFIG.MAP.styles.light);
                }
            },
            'projectLayer': (checked) => {
                markersManager.toggleMarkersVisibility(checked);
            },
            'provinceLayer': (checked) => {
                const opacity = checked ? 0.1 : 0;
                const hoverOpacity = checked ? 0.3 : 0;
                const selectedOpacity = checked ? 0.4 : 0;

                map.setPaintProperty('provinces-fill', 'fill-opacity', [
                    'case', ['boolean', ['feature-state', 'hover'], false], hoverOpacity, ['boolean', ['feature-state', 'selected'], false], selectedOpacity,
                    opacity
                ]);
                map.setPaintProperty('provinces-border', 'line-opacity', checked ? 0.3 : 0);
            }
        };

        Object.keys(layerControls).forEach(layerId => {
            const checkbox = utils.safeQuerySelector(`#${layerId}`);
            if (checkbox) {
                checkbox.addEventListener('change', (e) => {
                    layerControls[layerId](e.target.checked);
                });
            }
        });
    },

    setupCloseButtons() {
        const closeButtons = {
            'closeInfo': () => projectInfo.hideProjectInfo(),
            'closeProvinceInfo': () => provinceInfo.hideProvinceInfo(),
            'closeOverlay': () => this.hideElement('#mapOverlay'),
            'closeLegend': () => this.hideElement('#legend')
        };

        Object.entries(closeButtons).forEach(([id, handler]) => {
            const element = utils.safeQuerySelector(`#${id}`);
            if (element) {
                element.addEventListener('click', handler);
            }
        });
    },

    setupSearch() {
        const searchInput = utils.safeQuerySelector('#searchInput');
        if (searchInput) {
            const debouncedSearch = utils.debounce((e) => {
                projectsListManager.filterProjects(e.target.value.toLowerCase());
            }, 300);

            searchInput.addEventListener('input', debouncedSearch);
        }
    },

    showElement(selector) {
        const element = utils.safeQuerySelector(selector);
        if (element) {
            element.style.display = 'block';
        }
    },

    hideElement(selector) {
        const element = utils.safeQuerySelector(selector);
        if (element) {
            element.style.display = 'none';
        }
    },

    // ===== THÊM HÀM MỚI =====
    openDashboard() {
        if (window.dashboardManager && typeof dashboardManager.openDashboard === 'function') {
            dashboardManager.openDashboard();
            // Optional: highlight button
            const btn = utils.safeQuerySelector('#openStats');
            if (btn) {
                btn.classList.add('active');
                // Remove active khi đóng modal
                const dashboard = utils.safeQuerySelector('#statsDashboard');
                if (dashboard) {
                    const observer = new MutationObserver(() => {
                        if (dashboard.style.display === 'none') {
                            btn.classList.remove('active');
                        }
                    });
                    observer.observe(dashboard, { attributes: true, attributeFilter: ['style'] });
                }
            }
        } else {
            console.warn('⚠️ dashboardManager chưa được nạp');
        }
    }
};

// Statistics Management
const statistics = {
    update() {
        this.updateTotalProjects();
        this.updateTotalProvinces();
    },

    updateTotalProjects() {
        const element = utils.safeQuerySelector('#totalProjects');
        if (element) {
            element.textContent = projectsData.length;
        }
    },

    updateTotalProvinces() {
        const element = utils.safeQuerySelector('#totalProvinces');
        if (element) {
            const uniqueProvinces = new Set(projectsData.map(p => p.province));
            element.textContent = uniqueProvinces.size;
        }
    }
};

// ====== EXPORT & REPORTING FEATURES ======
const exportFeatures = {
    
    exportToCSV() {
        const headers = ['ID', 'Tên Công Trình', 'Tỉnh/Thành', 'Địa Chỉ', 'Nhà Đầu Tư', 'Năm', 'Quy Mô', 'Loại', 'Trạng Thái'];
        const rows = projectsData.map(p => [
            p.id,
           
            p.name,
            p.province,
            p.address,
            p.investor,
            p.year,
            p.scale,
            utils.getTypeName(p.type),
            p.status
        ]);

        let csv = headers.join(',') + '\n';
        rows.forEach(row => {
            csv += row.map(cell => `"${cell}"`).join(',') + '\n';
        });

        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `projects_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
    },

    exportToJSON() {
        const data = {
            exported: new Date().toISOString(),
            totalProjects: projectsData.length,
            totalProvinces: new Set(projectsData.map(p => p.province)).size,
            projects: projectsData
        };

        const link = document.createElement('a');
        link.href = 'data:application/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(data, null, 2));
        link.download = `projects_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
    },

    generateReport() {
        const stats = {
            total: projectsData.length,
            byType: {},
            byProvince: {},
            byStatus: {},
            totalBudget: 0
        };

        projectsData.forEach(p => {
            stats.byType[utils.getTypeName(p.type)] = (stats.byType[utils.getTypeName(p.type)] || 0) + 1;
            stats.byProvince[p.province] = (stats.byProvince[p.province] || 0) + 1;
            stats.byStatus[p.status] = (stats.byStatus[p.status] || 0) + 1;
        });

        console.log('📊 PROJECT STATISTICS:');
        console.table(stats);

        return stats;
    }
    
};

// Setup export button
document.addEventListener('DOMContentLoaded', () => {
    const exportBtn = utils.safeQuerySelector('#exportData');
    if (exportBtn) {
        exportBtn.addEventListener('click', () => {
            const menu = document.createElement('div');
            menu.style.cssText = `
                position: absolute;
                top: 100%;
                right: 0;
                background: white;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                z-index: 10000;
                overflow: hidden;
            `;
            menu.innerHTML = `
                <button style="display:block;width:100%;padding:10px 15px;text-align:left;border:none;background:none;cursor:pointer;font-size:0.9rem;" onclick="exportFeatures.exportToCSV()">
                    <i class="fas fa-file-csv"></i> Export CSV
                </button>
                <button style="display:block;width:100%;padding:10px 15px;text-align:left;border:none;background:none;cursor:pointer;font-size:0.9rem;" onclick="exportFeatures.exportToJSON()">
                    <i class="fas fa-file-code"></i> Export JSON
                </button>
                <button style="display:block;width:100%;padding:10px 15px;text-align:left;border:none;background:none;cursor:pointer;font-size:0.9rem;" onclick="exportFeatures.generateReport()">
                    <i class="fas fa-chart-bar"></i> Báo cáo
                </button>
            `;
            exportBtn.parentElement.appendChild(menu);
            setTimeout(() => menu.remove(), 5000);
        });
    }
});
// Main initialization
function init() {
    try {
        state.tooltip = document.createElement('div');
        state.tooltip.className = 'province-tooltip';
        const mapContainer = utils.safeQuerySelector('.map-container');
        if (mapContainer) {
            mapContainer.appendChild(state.tooltip);
        }

        map.on('movestart', () => state.isMapMoving = true);
        map.on('moveend', () => state.isMapMoving = false);

        uiControls.init();
        projectsListManager.populateProjectsList();
        statistics.update();
        imageUI.handleImageUpload(); // THÊM DÒng này

        this.hideLoadingOverlay();

        console.log('Map application initialized successfully');
    } catch (error) {
        console.error('Error initializing application:', error);
    }
}

function hideLoadingOverlay() {
    const loadingOverlay = utils.safeQuerySelector('.loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.style.opacity = '0';
        setTimeout(() => {
            if (loadingOverlay.parentNode) {
                loadingOverlay.remove();
            }
        }, 500);
    }
}

function handleMapLoad() {
    mapLayers.addProvincesLayer();
    markersManager.addProjectMarkers();
    mapLayers.setupProvinceInteractions();
}

// Initialize when map is ready
map.on('load', () => {
    handleMapLoad();
    init();
});

// ====== ADVANCED FILTERING ======
const advancedFilters = {
    filterByStatus(status) {
        return projectsData.filter(p => p.status === status);
    },

    filterByYearRange(fromYear, toYear) {
        return projectsData.filter(p => {
            const year = parseInt(p.year);
            return year >= fromYear && year <= toYear;
        });
    },

    filterByBudget(minBudget, maxBudget) {
        return projectsData.filter(p => {
            const budget = parseInt(p.budget);
            return budget >= minBudget && budget <= maxBudget;
        });
    },

    filterByMultipleCriteria(criteria) {
        return projectsData.filter(p => {
            let match = true;
            if (criteria.type && p.type !== criteria.type) match = false;
            if (criteria.province && !p.province.includes(criteria.province)) match = false;
            if (criteria.status && p.status !== criteria.status) match = false;
            if (criteria.yearFrom && parseInt(p.year) < criteria.yearFrom) match = false;
            if (criteria.yearTo && parseInt(p.year) > criteria.yearTo) match = false;
            return match;
        });
    },

    getFilteredStats(projects) {
        return {
            count: projects.length,
            byType: projects.reduce((acc, p) => {
                acc[utils.getTypeName(p.type)] = (acc[utils.getTypeName(p.type)] || 0) + 1;
                return acc;
            }, {}),
            byStatus: projects.reduce((acc, p) => {
                acc[p.status] = (acc[p.status] || 0) + 1;
                return acc;
            }, {})
        };
    }
};
// ====== COMPARISON MANAGER ======
const comparisonManager = {
    selectedProjects: [],
    maxComparison: 5,

    openComparison() {
        const modal = utils.safeQuerySelector('#comparisonModal');
        if (modal) {
            modal.style.display = 'flex';
            this.populateDropdown();
        }
    },

    closeComparison() {
        const modal = utils.safeQuerySelector('#comparisonModal');
        if (modal) {
            modal.style.display = 'none';
        }
    },

    populateDropdown() {
        const select = utils.safeQuerySelector('#comparisonSelect');
        if (!select) return;

        select.innerHTML = '<option value="">-- Chọn công trình --</option>';
        
        projectsData.forEach(project => {
            if (!this.selectedProjects.find(p => p.id === project.id)) {
                const option = document.createElement('option');
                option.value = project.id;
                option.textContent = `${project.name} (${project.province})`;
                select.appendChild(option);
            }
        });
    },

    addProject(projectId) {
        if (!projectId) return;

        if (this.selectedProjects.length >= this.maxComparison) {
            notificationSystem.error(`Chỉ có thể so sánh tối đa ${this.maxComparison} công trình`);
            return;
        }

        const project = projectsData.find(p => p.id === parseInt(projectId));
        if (!project) return;

        if (!this.selectedProjects.find(p => p.id === project.id)) {
            this.selectedProjects.push(project);
            this.updateTable();
            this.populateDropdown();
            notificationSystem.success(`Đã thêm: ${project.name}`);
        }
    },

    removeProject(projectId) {
        this.selectedProjects = this.selectedProjects.filter(p => p.id !== projectId);
        this.updateTable();
        this.populateDropdown();
    },

    clearComparison() {
        if (confirm('Bạn có chắc chắn muốn xóa tất cả?')) {
            this.selectedProjects = [];
            this.updateTable();
            this.populateDropdown();
        }
    },

    updateTable() {
        const tableHead = utils.safeQuerySelector('#comparisonTableHead');
        const tableBody = utils.safeQuerySelector('#comparisonTableBody');

        if (!tableHead || !tableBody) return;

        // Xóa cột cũ (giữ cột đầu tiên)
        const existingCols = tableHead.querySelectorAll('th:not(:first-child)');
        existingCols.forEach(col => col.remove());

        // Thêm cột mới cho mỗi project
        this.selectedProjects.forEach(project => {
            const th = document.createElement('th');
            th.innerHTML = `
                <div class="comparison-project-header">
                    <div class="comparison-project-name">${project.name}</div>
                    <div class="comparison-project-province">${project.province}</div>
                    <button class="comparison-remove-btn" onclick="comparisonManager.removeProject(${project.id})">
                        <i class="fas fa-trash-alt"></i> Xóa
                    </button>
                </div>
            `;
            tableHead.appendChild(th);
        });

        // Tạo dòng so sánh
        this.createComparisonRows();
    },

    createComparisonRows() {
        const tableBody = utils.safeQuerySelector('#comparisonTableBody');
        if (!tableBody) return;

        tableBody.innerHTML = '';

        const fields = [
            { key: 'name', label: '🏗️ Tên công trình' },
            { key: 'province', label: '📍 Tỉnh/Thành phố' },
            { key: 'address', label: '🏠 Địa chỉ' },
            { key: 'investor', label: '💼 Nhà đầu tư' },
            { key: 'year', label: '📅 Năm' },
            { key: 'scale', label: '📐 Quy mô' },
            { key: 'type', label: '🏢 Loại công trình' },
            { key: 'status', label: '✅ Trạng thái' },
            { key: 'budget', label: '💰 Ngân sách' },
            { key: 'description', label: '📝 Mô tả' }
        ];

        fields.forEach(field => {
            const tr = document.createElement('tr');
            
            const tdLabel = document.createElement('td');
            tdLabel.innerHTML = field.label;
            tdLabel.style.fontWeight = '600';
            tr.appendChild(tdLabel);

            this.selectedProjects.forEach(project => {
                const td = document.createElement('td');
                const value = project[field.key] || '-';
                
                // Format lại loại công trình
                if (field.key === 'type') {
                    td.textContent = utils.getTypeName(value);
                } else if (field.key === 'status') {
                    td.innerHTML = `<span class="status-badge status-${value}">${value}</span>`;
                } else {
                    td.textContent = value;
                }
                
                tr.appendChild(td);
            });

            tableBody.appendChild(tr);
        });
    },

    exportComparison() {
        if (this.selectedProjects.length === 0) {
            notificationSystem.error('Vui lòng chọn ít nhất 1 công trình để so sánh');
            return;
        }

        const fields = [
            'name', 'province', 'address', 'investor', 'year',
            'scale', 'type', 'status', 'budget', 'description'
        ];

        let csv = 'Thông tin,' + this.selectedProjects.map(p => p.name).join(',') + '\n';

        fields.forEach(field => {
            const label = this.getFieldLabel(field);
            csv += label + ',';
            csv += this.selectedProjects.map(p => {
                let value = p[field] || '-';
                if (field === 'type') value = utils.getTypeName(value);
                return `"${value}"`;
            }).join(',') + '\n';
        });

        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `comparison_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();

        notificationSystem.success('Đã tải xuống file so sánh');
    },

    getFieldLabel(key) {
        const labels = {
            name: 'Tên công trình',
            province: 'Tỉnh/Thành phố',
            address: 'Địa chỉ',
            investor: 'Nhà đầu tư',
            year: 'Năm',
            scale: 'Quy mô',
            type: 'Loại công trình',
            status: 'Trạng thái',
            budget: 'Ngân sách',
            description: 'Mô tả'
        };
        return labels[key] || key;
    }
};

// Setup event listeners
document.addEventListener('DOMContentLoaded', () => {
    const addBtn = utils.safeQuerySelector('#addComparisonBtn');
    const select = utils.safeQuerySelector('#comparisonSelect');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            const projectId = select?.value;
            comparisonManager.addProject(projectId);
        });
    }

    if (select) {
        select.addEventListener('change', (e) => {
            if (e.target.value) {
                comparisonManager.addProject(e.target.value);
                e.target.value = '';
            }
        });
    }

    // Đóng modal khi click overlay
    const overlay = utils.safeQuerySelector('.comparison-overlay');
    if (overlay) {
        overlay.addEventListener('click', () => {
            comparisonManager.closeComparison();
        });
    }

    // Đóng modal với phím Esc
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = utils.safeQuerySelector('#comparisonModal');
            if (modal && modal.style.display === 'flex') {
                comparisonManager.closeComparison();
            }
        }
    });
});

// Notification System (nếu chưa có)
const notificationSystem = {
    show(message, type = 'info', duration = 3000) {
        const div = document.createElement('div');
        div.className = `notification notification-${type}`;
        div.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            animation: slideInRight 0.3s ease;
        `;
        div.innerHTML = `<i class="fas fa-${type === 'success' ? 'check' : type === 'error' ? 'times' : 'info'}-circle"></i> ${message}`;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => div.remove(), 300);
        }, duration);
    },
    success(msg) { this.show(msg, 'success'); },
    error(msg) { this.show(msg, 'error'); },
    info(msg) { this.show(msg, 'info'); }
};
// ===== ADVANCED STATISTICS DASHBOARD MANAGER =====
const dashboardManager = {
    charts: {},
    
    openDashboard() {
        const dashboard = document.getElementById('statsDashboard');
        if (dashboard) {
            dashboard.style.display = 'flex';
            setTimeout(() => this.renderDashboard(), 100);
        }
    },

    closeDashboard() {
        const dashboard = document.getElementById('statsDashboard');
        if (dashboard) {
            dashboard.style.display = 'none';
        }
    },

    refreshStats() {
        // Destroy old charts
        Object.values(this.charts).forEach(chart => {
            if (chart && typeof chart.destroy === 'function') {
                chart.destroy();
            }
        });
        this.charts = {};
        
        // Re-render
        this.renderDashboard();
    },

    renderDashboard() {
        this.updateKPIs();
        this.renderChart1_TypeDistribution();
        this.renderChart2_ByYear();
        this.renderChart3_TopProvinces();
        this.renderChart4_Status();
        this.renderTopInvestorsTable();
    },

    // ===== UPDATE KPI CARDS =====
    updateKPIs() {
        if (!projectsData || projectsData.length === 0) return;

        const total = projectsData.length;
        const provinces = new Set(projectsData.map(p => p.province)).size;
        const commercial = projectsData.filter(p => p.type === 'commercial').length;
        const transport = projectsData.filter(p => p.type === 'transport').length;
        const industrial = projectsData.filter(p => p.type === 'industrial').length;

        document.getElementById('kpiTotal').textContent = total;
        document.getElementById('kpiProvinces').textContent = provinces;
        document.getElementById('kpiCommercial').textContent = commercial;
        document.getElementById('kpiTransport').textContent = transport;
        document.getElementById('kpiIndustrial').textContent = industrial;
    },

    // ===== CHART 1: PHÂN BỐ THEO LOẠI =====
    renderChart1_TypeDistribution() {
        const ctx = document.getElementById('chartTypeDistribution');
        if (!ctx) return;

        const data = {
            commercial: projectsData.filter(p => p.type === 'commercial').length,
            transport: projectsData.filter(p => p.type === 'transport').length,
            industrial: projectsData.filter(p => p.type === 'industrial').length
        };

        if (this.charts.typeDistribution) {
            this.charts.typeDistribution.destroy();
        }

        this.charts.typeDistribution = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: ['Thương Mại', 'Giao Thông', 'Công Nghiệp'],
                datasets: [{
                    data: [data.commercial, data.transport, data.industrial],
                    backgroundColor: ['#e74c3c', '#3498db', '#2ecc71'],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: {
                            font: { size: 12, weight: 'bold' },
                            padding: 15
                        }
                    }
                }
            }
        });
    },

    // ===== CHART 2: XU HƯỚNG THEO NĂM =====
    renderChart2_ByYear() {
        const ctx = document.getElementById('chartByYear');
        if (!ctx) return;

        // Group by year
        const yearMap = {};
        projectsData.forEach(p => {
            const year = p.year || 'N/A';
            yearMap[year] = (yearMap[year] || 0) + 1;
        });

        const years = Object.keys(yearMap).sort();
        const counts = years.map(y => yearMap[y]);

        if (this.charts.byYear) {
            this.charts.byYear.destroy();
        }

        this.charts.byYear = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: years,
                datasets: [{
                    label: 'Số Dự Án',
                    data: counts,
                    backgroundColor: '#3498db',
                    borderColor: '#2980b9',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: true }
                },
                scales: {
                    y: {
                        beginAtZero: true,
                        max: Math.max(...counts) + 5
                    }
                }
            }
        });
    },

    // ===== CHART 3: TOP 10 TỈNH/TP =====
    renderChart3_TopProvinces() {
        const ctx = document.getElementById('chartTopProvinces');
        if (!ctx) return;

        // Count by province
        const provinceMap = {};
        projectsData.forEach(p => {
            const province = p.province || 'N/A';
            provinceMap[province] = (provinceMap[province] || 0) + 1;
        });

        // Sort & get top 10
        const sorted = Object.entries(provinceMap)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 10);

        const provinces = sorted.map(x => x[0]);
        const counts = sorted.map(x => x[1]);

        if (this.charts.topProvinces) {
            this.charts.topProvinces.destroy();
        }

        this.charts.topProvinces = new Chart(ctx, {
            type: 'horizontalBar',
            data: {
                labels: provinces,
                datasets: [{
                    label: 'Số Dự Án',
                    data: counts,
                    backgroundColor: '#9b59b6',
                    borderColor: '#8e44ad',
                    borderWidth: 1
                }]
            },
            options: {
                indexAxis: 'y',
                responsive: true,
                maintainAspectRatio: false,
                plugins: { legend: { display: true } },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: Math.max(...counts) + 5
                    }
                }
            }
        });
    },

    // ===== CHART 4: PHÂN BỐ TRẠNG THÁI =====
    renderChart4_Status() {
        const ctx = document.getElementById('chartStatus');
        if (!ctx) return;

        const statusMap = {};
        projectsData.forEach(p => {
            const status = p.status || 'unknown';
            statusMap[status] = (statusMap[status] || 0) + 1;
        });

        const statuses = Object.keys(statusMap);
        const counts = Object.values(statusMap);

        if (this.charts.status) {
            this.charts.status.destroy();
        }

        this.charts.status = new Chart(ctx, {
            type: 'pie',
            data: {
                labels: statuses.map(s => this.getStatusLabel(s)),
                datasets: [{
                    data: counts,
                    backgroundColor: ['#2ecc71', '#f39c12', '#e74c3c'],
                    borderColor: 'white',
                    borderWidth: 2
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom',
                        labels: { font: { size: 12, weight: 'bold' }, padding: 15 }
                    }
                }
            }
        });
    },

    getStatusLabel(status) {
        const labels = {
            'completed': '✅ Hoàn Thành',
            'in-progress': '🚧 Đang Xây',
            'planned': '📋 Quy Hoạch'
        };
        return labels[status] || status;
    },

    // ===== TOP INVESTORS TABLE =====
    renderTopInvestorsTable() {
        const tbody = document.getElementById('topInvestorsTable');
        if (!tbody) return;

        // Count by investor
        const investorMap = {};
        projectsData.forEach(p => {
            const inv = p.investor || 'N/A';
            if (!investorMap[inv]) {
                investorMap[inv] = { count: 0, types: new Set() };
            }
            investorMap[inv].count++;
            investorMap[inv].types.add(p.type || 'unknown');
        });

        // Sort & get top 10
        const sorted = Object.entries(investorMap)
            .sort((a, b) => b[1].count - a[1].count)
            .slice(0, 10);

        tbody.innerHTML = '';
        sorted.forEach((item, idx) => {
            const [investor, data] = item;
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${idx + 1}</td>
                <td>${investor}</td>
                <td><strong>${data.count}</strong></td>
                <td>${Array.from(data.types).map(t => this.getTypeLabel(t)).join(', ')}</td>
            `;
            tbody.appendChild(tr);
        });
    },

    getTypeLabel(type) {
        const labels = {
            'commercial': '🏗️ Thương Mại',
            'transport': '🛣️ Giao Thông',
            'industrial': '🏭 Công Nghiệp'
        };
        return labels[type] || type;
    },

    // ===== EXPORT DASHBOARD =====
    exportDashboard() {
        const csv = this.generateCSV();
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `dashboard_${new Date().toISOString().split('T')[0]}.csv`;
        link.click();
        
        const notif = document.createElement('div');
        notif.textContent = '✅ Đã tải xuống dashboard';
        notif.style.cssText = 'position:fixed;top:20px;right:20px;background:#2ecc71;color:white;padding:12px 16px;border-radius:8px;z-index:9999;';
        document.body.appendChild(notif);
        setTimeout(() => notif.remove(), 2000);
    },

    generateCSV() {
        let csv = 'THỐNG KÊ CÔNG TRÌNH\n\n';
        csv += 'KPI,Giá Trị\n';
        csv += `Tổng Công Trình,${projectsData.length}\n`;
        csv += `Số Tỉnh/TP,${new Set(projectsData.map(p => p.province)).size}\n`;
        csv += `Thương Mại,${projectsData.filter(p => p.type === 'commercial').length}\n`;
        csv += `Giao Thông,${projectsData.filter(p => p.type === 'transport').length}\n`;
        csv += `Công Nghiệp,${projectsData.filter(p => p.type === 'industrial').length}\n\n`;
        
        csv += 'DANH SÁCH DỰ ÁN\n';
        csv += 'Tên,Tỉnh,Loại,Năm,Nhà Đầu Tư\n';
        projectsData.forEach(p => {
            csv += `"${p.name}","${p.province}","${p.type}","${p.year}","${p.investor}"\n`;
        });
        
        return csv;
    }
};

// Gắn sự kiện cho nút mở dashboard
document.addEventListener('DOMContentLoaded', () => {
    const openStatsBtn = document.getElementById('openStats');
    if (openStatsBtn) {
        openStatsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            dashboardManager.openDashboard();
        });
    }
});
// ===== FORM & DATA ENTRY MANAGER =====
const formManager = {
    currentProjectId: null,
    uploadedImages: [],
    pickingLocation: false,

    // Mở form thêm dự án
    openForm(projectId = null) {
        const modal = document.getElementById('dataEntryModal');
        const title = document.getElementById('formTitle');
        const form = document.getElementById('projectForm');

        if (!modal || !title || !form) {
            console.error('Form elements not found');
            return;
        }

        this.uploadedImages = [];
        this.currentProjectId = projectId;

        if (projectId) {
            // Edit mode
            title.textContent = '✏️ Sửa Dự Án';
            const project = projectsData.find(p => p.id === projectId);
            if (project) {
                this.populateForm(project);
            }
        } else {
            // Add mode
            title.textContent = '➕ Thêm Dự Án Mới';
            form.reset();
        }

        modal.style.display = 'flex';
        this.setupFormHandlers();
    },

    closeForm() {
        const modal = document.getElementById('dataEntryModal');
        if (modal) {
            modal.style.display = 'none';
        }
        this.uploadedImages = [];
        this.pickingLocation = false;
    },

    // Điền dữ liệu vào form (edit mode)
    populateForm(project) {
        document.getElementById('projectName').value = project.name || '';
        document.getElementById('projectType').value = project.type || '';
        document.getElementById('projectProvince').value = project.province || '';
        document.getElementById('projectYear').value = project.year || '';
        document.getElementById('projectStatus').value = project.status || '';
        document.getElementById('projectAddress').value = project.address || '';
        document.getElementById('projectLat').value = project.lat || '';
        document.getElementById('projectLng').value = project.lng || '';
        document.getElementById('projectInvestor').value = project.investor || '';
        document.getElementById('projectScale').value = project.scale || '';
        document.getElementById('projectBudget').value = project.budget || '';
        document.getElementById('projectDescription').value = project.description || '';
    },

    // Setup Form Handlers
    setupFormHandlers() {
        const form = document.getElementById('projectForm');
        const uploadZone = document.getElementById('imageUploadZone');
        const imageInput = document.getElementById('projectImages');

        // Form submit
        form.removeEventListener('submit', this.handleFormSubmit);
        form.addEventListener('submit', (e) => this.handleFormSubmit(e));

        // Image upload - Click
        uploadZone.addEventListener('click', () => imageInput.click());

        // Image upload - Drag & Drop
        uploadZone.addEventListener('dragover', (e) => {
            e.preventDefault();
            uploadZone.classList.add('dragover');
        });

        uploadZone.addEventListener('dragleave', () => {
            uploadZone.classList.remove('dragover');
        });

        uploadZone.addEventListener('drop', (e) => {
            e.preventDefault();
            uploadZone.classList.remove('dragover');
            this.handleImageFiles(e.dataTransfer.files);
        });

        // Image input change
        imageInput.removeEventListener('change', this.handleImageInput);
        imageInput.addEventListener('change', (e) => this.handleImageInput(e));
    },

    // Handle Form Submit
    handleFormSubmit(e) {
        e.preventDefault();

        // Validate
        if (!this.validateForm()) {
            return;
        }

        // Get form data
        const formData = new FormData(document.getElementById('projectForm'));
        const projectData = {
            id: this.currentProjectId || Math.max(...projectsData.map(p => p.id), 0) + 1,
            name: formData.get('name'),
            type: formData.get('type'),
            province: formData.get('province'),
            year: formData.get('year'),
            status: formData.get('status'),
            address: formData.get('address'),
            lat: parseFloat(formData.get('lat')) || 0,
            lng: parseFloat(formData.get('lng')) || 0,
            investor: formData.get('investor'),
            scale: formData.get('scale'),
            budget: parseFloat(formData.get('budget')) || 0,
            description: formData.get('description'),
            images: this.uploadedImages
        };

        // Save (Add or Update)
        if (this.currentProjectId) {
            // Update existing
            const idx = projectsData.findIndex(p => p.id === this.currentProjectId);
            if (idx !== -1) {
                projectsData[idx] = { ...projectsData[idx], ...projectData };
            }
        } else {
            // Add new
            projectsData.push(projectData);
        }

        // Notification
        this.showNotification(
            this.currentProjectId ? '✅ Cập nhật dự án thành công!' : '✅ Thêm dự án thành công!',
            'success'
        );

        // Refresh map & stats
        if (window.markersManager && typeof markersManager.addProjectMarkers === 'function') {
            markersManager.addProjectMarkers();
        }
        if (window.statistics && typeof statistics.update === 'function') {
            statistics.update();
        }
        if (window.dashboardManager && typeof dashboardManager.refreshStats === 'function') {
            dashboardManager.refreshStats();
        }

        // Close form
        this.closeForm();
    },

    // Validate Form
    validateForm() {
        const form = document.getElementById('projectForm');
        const fields = ['name', 'type', 'province', 'year', 'status', 'address', 'investor'];
        let isValid = true;

        // Clear old errors
        form.querySelectorAll('.form-group').forEach(g => g.classList.remove('error'));
        form.querySelectorAll('.form-error').forEach(e => e.classList.remove('show'));

        // Check required fields
        fields.forEach(field => {
            const input = document.getElementById(`project${field.charAt(0).toUpperCase() + field.slice(1)}`);
            if (!input || !input.value.trim()) {
                isValid = false;
                const errorEl = document.getElementById(`${field}Error`);
                if (errorEl) {
                    errorEl.textContent = '⚠️ Trường này là bắt buộc';
                    errorEl.classList.add('show');
                    input.parentElement.classList.add('error');
                }
            }
        });

        // Validate year
        const yearInput = document.getElementById('projectYear');
        if (yearInput && (isNaN(yearInput.value) || yearInput.value < 2000 || yearInput.value > 2099)) {
            const errorEl = document.getElementById('yearError');
            if (errorEl) {
                errorEl.textContent = '⚠️ Năm phải từ 2000-2099';
                errorEl.classList.add('show');
                yearInput.parentElement.classList.add('error');
            }
            isValid = false;
        }

        // Validate coordinates if provided
        const latInput = document.getElementById('projectLat');
        const lngInput = document.getElementById('projectLng');
        if ((latInput && latInput.value && (isNaN(latInput.value) || latInput.value < -90 || latInput.value > 90)) ||
            (lngInput && lngInput.value && (isNaN(lngInput.value) || lngInput.value < -180 || lngInput.value > 180))) {
            const errorEl = document.getElementById('latError');
            if (errorEl) {
                errorEl.textContent = '⚠️ Tọa độ không hợp lệ';
                errorEl.classList.add('show');
            }
            isValid = false;
        }

        if (!isValid) {
            this.showNotification('⚠️ Vui lòng điền đầy đủ các trường bắt buộc', 'error');
        }

        return isValid;
    },

    // Handle Image Files
    handleImageFiles(files) {
        Array.from(files).forEach(file => {
            if (!file.type.startsWith('image/')) {
                this.showNotification('⚠️ Chỉ chấp nhận file ảnh', 'error');
                return;
            }

            if (file.size > 5 * 1024 * 1024) {
                this.showNotification('⚠️ Kích thước ảnh không vượt quá 5MB', 'error');
                return;
            }

            const reader = new FileReader();
            reader.onload = (e) => {
                this.uploadedImages.push({
                    name: file.name,
                    data: e.target.result
                });
                this.renderImagePreview();
            };
            reader.readAsDataURL(file);
        });
    },

    handleImageInput(e) {
        this.handleImageFiles(e.target.files);
    },

    // Render Image Preview
    renderImagePreview() {
        const preview = document.getElementById('imagePreview');
        if (!preview) return;

        preview.innerHTML = '';
        this.uploadedImages.forEach((img, idx) => {
            const div = document.createElement('div');
            div.className = 'preview-item';
            div.innerHTML = `
                <img src="${img.data}" alt="preview">
                <button type="button" class="remove-image" onclick="formManager.removeImage(${idx})">
                    <i class="fas fa-times"></i>
                </button>
            `;
            preview.appendChild(div);
        });
    },

    removeImage(idx) {
        this.uploadedImages.splice(idx, 1);
        this.renderImagePreview();
    },

    // Pick Location From Map
    pickLocationFromMap() {
        const modal = document.getElementById('dataEntryModal');
        if (!modal || !window.map) return;

        modal.style.display = 'none';
        this.pickingLocation = true;

        const notif = document.createElement('div');
        notif.textContent = '📍 Click trên bản đồ để chọn vị trí';
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: var(--primary-color, #3498db);
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 5000;
            font-weight: 600;
        `;
        document.body.appendChild(notif);

        const onMapClick = (e) => {
            if (!this.pickingLocation) return;

            const coords = e.lngLat;

            // Tạo marker tạm thời
            new mapboxgl.Marker({ color: this.pickingMode === 'from' ? '#e74c3c' : '#2ecc71' })
                .setLngLat([coords.lng, coords.lat])
                .addTo(map);

            if (this.pickingMode === 'from') {
                this.fromProject = {
                    lat: coords.lat,
                    lng: coords.lng,
                    name: `Điểm xuất phát (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
                };
                this.updateFromCoords();
            } else {
                this.toProject = {
                    lat: coords.lat,
                    lng: coords.lng,
                    name: `Điểm đích (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
                };
                this.updateToCoords();
            }

            map.off('click', onMapClick);
            this.pickingMode = null;
        };

        map.on('click', onMapClick);
    },

    // Notification
    showNotification(message, type = 'info') {
        const div = document.createElement('div');
        div.className = `notification notification-${type}`;
        div.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#2ecc71' : type === 'error' ? '#e74c3c' : '#3498db'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.2);
            z-index: 10001;
            font-weight: 600;
            animation: slideInRight 0.3s ease;
        `;
        div.textContent = message;
        document.body.appendChild(div);

        setTimeout(() => {
            div.style.animation = 'slideOutRight 0.3s ease';
            setTimeout(() => div.remove(), 300);
        }, 3000);
    }
};

// Setup event listeners
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('projectForm');
    if (form) {
        form.addEventListener('submit', (e) => formManager.handleFormSubmit(e));
    }
});
// Gắn sự kiện cho nút form
document.addEventListener('DOMContentLoaded', () => {
    const openFormBtn = document.getElementById('openFormBtn');
    if (openFormBtn) {
        openFormBtn.addEventListener('click', () => {
            formManager.openForm(); // Thêm dự án mới
        });
    }
});
// ===== ROUTE PLANNING & DISTANCE CALCULATOR =====
const routeManager = {
    fromProject: null,
    toProject: null,
    currentMode: 'driving',
    currentRoute: null,
    savedRoutes: [],
    pickingMode: null, // 'from' hoặc 'to'
    routeLayer: null,

    openRoutePanel() {
        const modal = document.getElementById('routePlanningModal');
        if (modal) {
            modal.style.display = 'flex';
            this.populateProjectSelects();
            this.loadSavedRoutes();
        }
    },

    closeRoutePanel() {
        const modal = document.getElementById('routePlanningModal');
        if (modal) {
            modal.style.display = 'none';
            this.clearRouteHighlight();
        }
        this.pickingMode = null;
    },

    // Populate selects with projects
    populateProjectSelects() {
        const fromSelect = document.getElementById('routeFromSelect');
        const toSelect = document.getElementById('routeToSelect');

        if (!fromSelect || !toSelect || !projectsData) return;

        [fromSelect, toSelect].forEach(select => {
            select.innerHTML = '<option value="">-- Chọn công trình --</option>';
            projectsData.forEach(p => {
                const option = document.createElement('option');
                option.value = p.id;
                option.textContent = `${p.name} (${p.province})`;
                select.appendChild(option);
            });
        });

        // Add change listeners
        fromSelect.addEventListener('change', (e) => {
            this.fromProject = projectsData.find(p => p.id == e.target.value);
            this.updateFromCoords();
        });

        toSelect.addEventListener('change', (e) => {
            this.toProject = projectsData.find(p => p.id == e.target.value);
            this.updateToCoords();
        });
    },

    updateFromCoords() {
        const text = this.fromProject 
            ? `${this.fromProject.lat.toFixed(4)}, ${this.fromProject.lng.toFixed(4)}`
            : '-';
        document.getElementById('fromCoordsText').textContent = text;
    },

    updateToCoords() {
        const text = this.toProject 
            ? `${this.toProject.lat.toFixed(4)}, ${this.toProject.lng.toFixed(4)}`
            : '-';
        document.getElementById('toCoordsText').textContent = text;
    },

    // Pick from map
    pickFromMap() {
        if (!window.map) return;
        this.pickingMode = 'from';
        this.showMapPickNotification('Nhấp trên bản đồ để chọn điểm xuất phát');
        this.setupMapClickListener();
    },

    pickToMap() {
        if (!window.map) return;
        this.pickingMode = 'to';
        this.showMapPickNotification('Nhấp trên bản đồ để chọn điểm đích');
        this.setupMapClickListener();
    },

    setupMapClickListener() {
        const handleClick = (e) => {
            if (!this.pickingMode) return;

            const coords = e.lngLat;

            // Tạo marker tạm thời
            new mapboxgl.Marker({ color: this.pickingMode === 'from' ? '#e74c3c' : '#2ecc71' })
                .setLngLat([coords.lng, coords.lat])
                .addTo(map);

            if (this.pickingMode === 'from') {
                this.fromProject = {
                    lat: coords.lat,
                    lng: coords.lng,
                    name: `Điểm xuất phát (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
                };
                this.updateFromCoords();
            } else {
                this.toProject = {
                    lat: coords.lat,
                    lng: coords.lng,
                    name: `Điểm đích (${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)})`
                };
                this.updateToCoords();
            }

            map.off('click', handleClick);
            this.pickingMode = null;
        };

        map.on('click', handleClick);
    },

    showMapPickNotification(message) {
        const notif = document.createElement('div');
        notif.style.cssText = `
            position: fixed;
            top: 20px;
            left: 50%;
            transform: translateX(-50%);
            background: #f39c12;
            color: white;
            padding: 12px 20px;
            border-radius: 8px;
            z-index: 5001;
            font-weight: 600;
            animation: slideDown 0.3s ease;
        `;
        notif.textContent = message;
        document.body.appendChild(notif);

        setTimeout(() => notif.remove(), 3000);
    },

    // Swap route points
    swapRoutePoints() {
        [this.fromProject, this.toProject] = [this.toProject, this.fromProject];
        this.updateFromCoords();
        this.updateToCoords();

        // Update selects
        const fromSelect = document.getElementById('routeFromSelect');
        const toSelect = document.getElementById('routeToSelect');
        if (this.fromProject && fromSelect) fromSelect.value = this.fromProject.id || '';
        if (this.toProject && toSelect) toSelect.value = this.toProject.id || '';
    },

    // Set travel mode
    setMode(mode) {
        this.currentMode = mode;

        // Update button styles
        document.querySelectorAll('.mode-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.mode === mode);
        });
    },

    // Calculate route
    async calculateRoute() {
        if (!this.fromProject || !this.toProject) {
            alert('⚠️ Vui lòng chọn điểm xuất phát và điểm đích');
            return;
        }

        const btn = document.querySelector('.btn-calculate-route');
        btn.disabled = true;
        btn.textContent = '⏳ Đang tính toán...';

        try {
            const coords = `${this.fromProject.lng},${this.fromProject.lat};${this.toProject.lng},${this.toProject.lat}`;
            // use the selected mode directly
            const profile = this.currentMode; // 'driving' | 'walking' | 'cycling'
            // build exclude param
            const excludes = [];
            if (document.getElementById('routeAvoidTolls').checked) excludes.push('toll');
            if (document.getElementById('routeAvoidMotorway').checked) excludes.push('motorway');
            const excludeParam = excludes.length ? `&exclude=${excludes.join(',')}` : '';
            const alternatives = document.getElementById('routeShowAlternatives').checked ? '&alternatives=true' : '&alternatives=false';

            const url = `https://api.mapbox.com/directions/v5/mapbox/${profile}/${coords}?` +
                `access_token=${mapboxgl.accessToken}&` +
                `geometries=geojson&overview=full&steps=true&banner_instructions=true&language=vi` +
                `${excludeParam}${alternatives}`;

            const response = await fetch(url);
            const data = await response.json();

            if (data.routes && data.routes.length > 0) {
                this.displayRouteResults(data);
            } else {
                alert('❌ Không tìm thấy tuyến đường');
            }
        } catch (error) {
            console.error('Route calculation error:', error);
            alert('❌ Lỗi khi tính toán tuyến đường');
        } finally {
            btn.disabled = false;
            btn.textContent = '🧮 Tính Toán Tuyến Đường';
        }
    },

    // Display route results
    displayRouteResults(data) {
        const resultsDiv = document.getElementById('routeResults');
        const primaryRoute = data.routes[0];
        const distance = (primaryRoute.distance / 1000).toFixed(2);
        const duration = Math.round(primaryRoute.duration / 60);
        const avgSpeed = (primaryRoute.distance / primaryRoute.duration * 3.6).toFixed(1);

        // Update KPIs
        document.getElementById('routeDistance').textContent = `${distance} km`;
        document.getElementById('routeDuration').textContent = `${duration} phút`;
        document.getElementById('routeAvgSpeed').textContent = `${avgSpeed} km/h`;

        // Display directions
        this.displayDirections(primaryRoute.legs[0].steps);

        // Display alternative routes
        if (data.routes.length > 1 && document.getElementById('routeShowAlternatives').checked) {
            this.displayAlternativeRoutes(data.routes.slice(1));
        }

        // Draw route on map
        this.drawRouteOnMap(primaryRoute.geometry.coordinates);

        // Show results
        resultsDiv.style.display = 'block';
        this.currentRoute = primaryRoute;
    },

    // Display directions
    displayDirections(steps) {
        const directionsList = document.getElementById('directionsList');
        directionsList.innerHTML = '';

        steps.forEach((step, idx) => {
            const instruction = step.maneuver?.instruction || step.name || 'Tiếp tục';
            const distance = (step.distance / 1000).toFixed(2);

            const div = document.createElement('div');
            div.className = 'direction-step';
            div.innerHTML = `
                <span class="step-number">${idx + 1}.</span>
                <span class="step-instruction">${instruction}</span>
                <span class="step-distance">(${distance} km)</span>
            `;
            directionsList.appendChild(div);
        });
    },

    // Display alternative routes
    displayAlternativeRoutes(alternativeRoutes) {
        const altDiv = document.getElementById('alternativeRoutes');
        const list = document.getElementById('alternativeRoutesList');

        if (alternativeRoutes.length === 0) {
            altDiv.style.display = 'none';
            return;
        }

        list.innerHTML = '';
        alternativeRoutes.forEach((route, idx) => {
            const distance = (route.distance / 1000).toFixed(2);
            const duration = Math.round(route.duration / 60);

            const div = document.createElement('div');
            div.className = 'alternative-route-item';
            div.innerHTML = `
                <strong>Tuyến ${idx + 2}:</strong> ${distance} km - ${duration} phút
            `;
            div.onclick = () => this.selectAlternativeRoute(route);
            list.appendChild(div);
        });

        altDiv.style.display = 'block';
    },

    selectAlternativeRoute(route) {
        this.currentRoute = route;
        this.drawRouteOnMap(route.geometry.coordinates);
        this.displayDirections(route.legs[0].steps);

        // Update KPIs
        const distance = (route.distance / 1000).toFixed(2);
        const duration = Math.round(route.duration / 60);
        const avgSpeed = (route.distance / route.duration * 3.6).toFixed(1);

        document.getElementById('routeDistance').textContent = `${distance} km`;
        document.getElementById('routeDuration').textContent = `${duration} phút`;
        document.getElementById('routeAvgSpeed').textContent = `${avgSpeed} km/h`;
    },

    // Draw route on map
    drawRouteOnMap(coordinates) {
        if (!window.map) return;

        // Remove existing route
        this.clearRouteHighlight();

        // Add route layer
        map.addSource('route', {
            type: 'geojson',
            data: {
                type: 'Feature',
                geometry: {
                    type: 'LineString',
                    coordinates: coordinates
                }
            }
        });

        map.addLayer({
            id: 'route',
            type: 'line',
            source: 'route',
            layout: {
                'line-join': 'round',
                'line-cap': 'round'
            },
            paint: {
                'line-color': '#f39c12',
                'line-width': 4,
                'line-opacity': 0.8
            }
        });

        // Add start & end markers
        new mapboxgl.Marker({ color: '#e74c3c' })
            .setLngLat(coordinates[0])
            .addTo(map);

        new mapboxgl.Marker({ color: '#2ecc71' })
            .setLngLat(coordinates[coordinates.length - 1])
            .addTo(map);

        // Zoom to route
        const bounds = coordinates.reduce((bounds, coord) => {
            return bounds.extend(coord);
        }, new mapboxgl.LngLatBounds(coordinates[0], coordinates[0]));

        map.fitBounds(bounds, { padding: 50 });
    },

    clearRouteHighlight() {
        if (!window.map) return;

        if (map.getLayer('route')) {
            map.removeLayer('route');
        }
        if (map.getSource('route')) {
            map.removeSource('route');
        }
    },

    // Export route
    exportRoute() {
        if (!this.currentRoute) return;

        const data = {
            from: this.fromProject.name,
            to: this.toProject.name,
            distance: (this.currentRoute.distance / 1000).toFixed(2) + ' km',
            duration: Math.round(this.currentRoute.duration / 60) + ' phút',
            mode: this.currentMode,
            timestamp: new Date().toLocaleString('vi-VN')
        };

        const csv = `Từ,Đến,Khoảng Cách,Thời Gian,Chế Độ,Ngày Giờ\n${Object.values(data).join(',')}`;
        const link = document.createElement('a');
        link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csv);
        link.download = `route_${Date.now()}.csv`;
        link.click();
    },

    // Save route
    saveRoute() {
        if (!this.currentRoute) return;

        const name = prompt('Nhập tên tuyến đường:');
        if (!name) return;

        const route = {
            id: Date.now(),
            name,
            from: this.fromProject.name,
            to: this.toProject.name,
            distance: (this.currentRoute.distance / 1000).toFixed(2),
            duration: Math.round(this.currentRoute.duration / 60),
            mode: this.currentMode,
            timestamp: new Date().toLocaleString('vi-VN'),
            geometry: this.currentRoute.geometry
        };

        this.savedRoutes.push(route);
        localStorage.setItem('savedRoutes', JSON.stringify(this.savedRoutes));
        this.loadSavedRoutes();
        alert('✅ Tuyến đường đã được lưu');
    },

    // Load saved routes
    loadSavedRoutes() {
        const saved = localStorage.getItem('savedRoutes');
        this.savedRoutes = saved ? JSON.parse(saved) : [];

        const list = document.getElementById('savedRoutesList');
        list.innerHTML = '';

        if (this.savedRoutes.length === 0) {
            list.innerHTML = '<p class="no-saved">Chưa có tuyến đường được lưu</p>';
            return;
        }

        this.savedRoutes.forEach(route => {
            const div = document.createElement('div');
            div.className = 'saved-route-item';
            div.innerHTML = `
                <div>
                    <div class="saved-route-name">${route.name}</div>
                    <div class="saved-route-info">${route.from} → ${route.to} | ${route.distance}km | ${route.duration}phút</div>
                </div>
                <button class="btn-delete-route" onclick="routeManager.deleteSavedRoute(${route.id})">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            list.appendChild(div);
        });
    },

    deleteSavedRoute(id) {
        this.savedRoutes = this.savedRoutes.filter(r => r.id !== id);
        localStorage.setItem('savedRoutes', JSON.stringify(this.savedRoutes));
        this.loadSavedRoutes();
    },

    // Share route
    shareRoute() {
        if (!this.currentRoute) return;

        const text = `Tuyến đường từ ${this.fromProject.name} đến ${this.toProject.name}: ${(this.currentRoute.distance / 1000).toFixed(2)}km, ${Math.round(this.currentRoute.duration / 60)} phút`;

        if (navigator.share) {
            navigator.share({
                title: 'Chia sẻ tuyến đường',
                text: text
            });
        } else {
            const input = document.createElement('textarea');
            input.value = text;
            document.body.appendChild(input);
            input.select();
            document.execCommand('copy');
            document.body.removeChild(input);
            alert('✅ Đã sao chép vào bộ nhớ tạm');
        }
    }
};

// Setup route panel button
document.addEventListener('DOMContentLoaded', () => {
    const openRouteBtn = document.getElementById('openRouteBtn');
    if (openRouteBtn) {
        openRouteBtn.addEventListener('click', () => routeManager.openRoutePanel());
    }
});
// Đã cuyển file code Dữ liệu file bản đô GeoJSON data for Vietnam provinces (34 provinces) sang file tên Codebando.js để dễ quản lý hơn