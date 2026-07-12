document.addEventListener("DOMContentLoaded", function () {
  const welcomeScreen = document.getElementById("welcome-screen");
  const mainContent = document.getElementById("main-content");
  const openBtn = document.getElementById("open-invitation-btn");
  const musicToggle = document.getElementById("music-toggle");
  const bgMusic = document.getElementById("bg-music");

  let isPlaying = false;

  // 1. Xử lý khi khách bấm nút "Mở Thiệp"
  openBtn.addEventListener("click", function () {
    // --- QUAN TRỌNG: GỌI PLAY() NGAY LẬP TỨC TẠI ĐÂY ---
    // Không được để bên trong setTimeout, nếu không iOS sẽ chặn!
    playMusic();

    // Vẫn giữ nguyên hiệu ứng mờ dần màn hình chào
    welcomeScreen.style.opacity = "0";

    // Đợi 0.8 giây để xóa hẳn màn chào
    setTimeout(() => {
      welcomeScreen.style.display = "none";
      mainContent.classList.remove("hidden");
    }, 800);
  });

  // Hàm thực hiện phát nhạc
  function playMusic() {
    // iOS yêu cầu tương tác người dùng, gọi trực tiếp .play()
    let playPromise = bgMusic.play();

    // Xử lý Promise trả về từ hàm play() để tránh lỗi đỏ console
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          isPlaying = true;
          musicToggle.innerText = "🎵 Tắt Nhạc";
        })
        .catch((error) => {
          console.log("Trình duyệt chặn phát âm thanh:", error);
          // Nếu vẫn bị chặn, hiển thị nút để người dùng tự bật
          isPlaying = false;
          musicToggle.innerText = "🔇 Bật Nhạc";
        });
    }
  }

  // Hàm thực hiện dừng nhạc
  function pauseMusic() {
    bgMusic.pause();
    isPlaying = false;
    musicToggle.innerText = "🔇 Bật Nhạc";
  }

  // 2. Cho phép khách bấm Bật/Tắt nhạc theo ý muốn
  musicToggle.addEventListener("click", function () {
    if (isPlaying) {
      pauseMusic();
    } else {
      playMusic();
    }
  });
});

// --- 3. XỬ LÝ MODAL PHÓNG TO SƠ ĐỒ TRƯỜNG ---
const mapImg = document.querySelector(".campus-img");
const mapModal = document.getElementById("map-modal");
const closeModalBtn = document.querySelector(".close-modal");

mapImg.addEventListener("click", function () {
  mapModal.classList.remove("hidden");
});

closeModalBtn.addEventListener("click", function () {
  mapModal.classList.add("hidden");
});

mapModal.addEventListener("click", function (event) {
  if (event.target === mapModal) {
    mapModal.classList.add("hidden");
  }
});
