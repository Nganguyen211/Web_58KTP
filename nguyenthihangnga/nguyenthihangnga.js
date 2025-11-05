// 
const API_URL = 'http://localhost:1880/timkiem';

document.getElementById('searchForm').addEventListener('submit', async (e) => {
  e.preventDefault();

  const query = document.getElementById('query').value.trim();
  const resultDiv = document.getElementById('result');
  const loading = document.getElementById('loading');

  if (!query) {
    showError('Vui lòng nhập từ khóa tìm kiếm!');
    return;
  }

  // Hiển thị loading
  loading.classList.remove('hidden');
  resultDiv.innerHTML = '';
  resultDiv.className = '';

  try {
    const response = await fetch(`${API_URL}?q=${encodeURIComponent(query)}`);
    const data = await response.json();

    loading.classList.add('hidden');

    if (data.status === 'success' && data.count > 0) {
      showResults(data.data);
    } else {
      showNoResult(data.message || 'Không tìm thấy học viên nào.');
    }

  } catch (err) {
    console.error('Lỗi:', err);
    loading.classList.add('hidden');
    showError('Không kết nối được tới server. Vui lòng kiểm tra Node-RED.');
  }
});

// Hiển thị danh sách học viên
function showResults(hocviens) {
  const resultDiv = document.getElementById('result');
  let html = '';

  hocviens.forEach(hv => {
    html += `
      <div class="result-card">
        <h3>${hv.HoTen || 'Không có tên'}</h3>
        <div class="result-grid">
          <strong>Mã HV:</strong> <span>${hv.MaHV || '—'}</span>
          <strong>Lớp:</strong> <span>${hv.Lop || '—'}</span>
          <strong>Email:</strong> <span>${hv.Email || '—'}</span>
          <strong>Điện thoại:</strong> <span>${hv.DienThoai || '—'}</span>
        </div>
      </div>
    `;
  });

  resultDiv.innerHTML = html;
}

// Không có kết quả
function showNoResult(message) {
  document.getElementById('result').innerHTML = `
    <div class="no-result">
      Không tìm thấy học viên nào.<br>
      <small>${message}</small>
    </div>
  `;
}

// Lỗi
function showError(message) {
  document.getElementById('result').innerHTML = `
    <div class="error">
      Lỗi: ${message}
    </div>
  `;
}