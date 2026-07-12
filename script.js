document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");
  const openBtn = document.getElementById("open-invitation-btn");
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");

  let isPlaying = false;

  // 1. Xử lý khi khách bấm nút "Mở Thiệp"
  openBtn.addEventListener("click", function () {
    // Tạo hiệu ứng mờ dần màn hình chào
    welcomeScreen.style.opacity = "0";

    // Đợi 0.8 giây (bằng thời gian hiệu ứng chuyển động ở CSS) rồi xóa hẳn màn chào
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      mainContent.classList.remove("hidden");

      // Tự động kích hoạt phát nhạc sau khi đã có tương tác từ khách
      playMusic();
    }, 800);
  });

  // Hàm thực hiện phát nhạc
  function playMusic() {
    bgMusic
      .play()
      .then(() => {
        isPlaying = true;
        musicToggle.innerText = "🎵 Tắt Nhạc";
      })
      .catch((error) => {
        console.log("Trình duyệt chặn phát âm thanh tự động:", error);
      });
  }

  // Hàm thực hiện dừng nhạc
  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.innerText = "🔇 Bật Nhạc";
  }

  // 2. Cho phép khách bấm Bật/Tắt nhạc theo ý muốn tại góc màn hình
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
});

// --- THÊM MỚI: 3. XỬ LÝ MODAL PHÓNG TO SƠ ĐỒ TRƯỜNG ---
const mapImg = document.querySelector(".campus-img"); // Lấy thẻ ảnh sơ đồ
const mapModal = document.getElementById("map-modal"); // Lấy khung popup modal
const closeModalBtn = document.querySelector(".close-modal"); // Nút dấu X

// Khi click vào ảnh gốc -> Hiển thị Modal
mapImg.addEventListener("click", function () {
  mapModal.classList.remove("hidden");
});

// Khi click vào dấu X -> Ẩn Modal
closeModalBtn.addEventListener("click", function () {
  mapModal.classList.add("hidden");
});

// Khi click ra vùng đen bên ngoài ảnh -> Cũng ẩn Modal cho tiện
mapModal.addEventListener("click", function (event) {
  if (event.target === mapModal) {
    mapModal.classList.add("hidden");
  }
});
