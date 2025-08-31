---
title: Ilustration with TikZ và Latex
date: 2025-08-26 12:00:00 +0700
categories: [Life]
tags: [idea]
---

---
# Hướng dẫn sử dụng TikZ và latex để minh hoạ technical graphics

---

Nếu bạn từng lật qua một luận văn thạc sĩ, bài báo khoa học, hay thậm chí là slide giảng dạy của giáo sư, bạn hẳn đã chú ý đến một điều:

- Các sơ đồ mạch số rõ ràng, cân đối, không một pixel nào bị lệch
- Bảng biểu gọn gàng, viền đẹp, font chữ chuẩn
- Công thức toán học sắc nét như in, không hề mờ hay vỡ hình 

Và điều thú vị là hầu hết những hình ảnh đó không được vẽ bằng PowerPoint hay Canva.

--> Mà chúng được tạo ra bằng một công cụ cực kỳ mạnh mẽ: LaTeX và TikZ.

## **1. Giới thiệu**
### **1.1. Latex**


<div style="text-align: center;">
  <img src="/assets/img/latex.png" alt="Sin Cos" style="width: auto; height: auto;">
  <p secession="image-caption" style="font-family: 'Computer Modern', 'Times New Roman', serif; font-size: 16px; margin-top: 10px;">Math illustration</p>
</div>


Latex là hệ thống soạn thảo tài liệu dựa trên mã nguồn – bạn viết code, và máy sẽ “biên dịch” thành file PDF cực kỳ chuyên nghiệp.

LaTeX đặc biệt mạnh trong việc:
- Xử lý công thức toán học phức tạp
- Tự động đánh số chương, mục, hình ảnh, bảng biểu
- Tạo tài liệu có bố cục đồng nhất, chuẩn học thuật

### **1.2. TikZ – “bút vẽ kỹ thuật số” cho dân kỹ thuật**


<div style="text-align: center;">
  <img src="/assets/img/CPU.png" alt="CPU Ilustration by Alexandros Tsagkaropoulos" style="width: auto; height: auto;">
  <p secession="image-caption" style="font-family: 'Computer Modern', 'Times New Roman', serif; font-size: 16px; margin-top: 10px;">CPU Ilustration by Alexandros Tsagkaropoulos</p>
</div>


Nếu LaTeX là “nhà văn”, thì TikZ chính là “họa sĩ” đi cùng.

TikZ là một thư viện vẽ tích hợp trong LaTeX, cho phép bạn:

- Vẽ sơ đồ mạch số (AND, OR, XOR, Full Adder…)
- Minh hoạ sơ đồ khối, hệ thống điều khiển, thuật toán
- Tạo đồ thị, hình học, biểu đồ trạng thái – tất cả bằng mã lệnh

## 2. Học Latex và TikZ như thế nào?

### Bước 1: Chọn nơi để "tập viết" – Nơi bạn sẽ code LaTeX

Trước tiên, bạn cần một **nơi để viết và chạy mã LaTeX**. Giống như học nấu ăn, bạn cần có bếp trước đã!


#### Option 1: [Overleaf](https://www.overleaf.com) – Viết LaTeX online, không cần cài đặt
#### Option 2: Cài đặt trên máy – Chủ động, mạnh mẽ hơn

| Hệ điều hành | Gói cài đặt       | Editor gợi ý               |
|------------|------------------|----------------------------|
| Windows    | [MiKTeX](https://miktex.org/download) | TeXstudio, VS Code         |
| macOS      | [MacTeX](https://www.tug.org/mactex/) | TeXShop, VS Code           |
| Linux      | `texlive-full`   | TeXstudio, Vim             |

### Bước 2: Học TikZ từ những ví dụ thực tế

Dưới đây là list các trang web cung cấp các ví dụ vẽ TikZ:

1. Tutorial của [**TikZ Dev**](https://tikz.dev/tutorial)

2. [**TikZ Net**](https://tikz.net/)

3. [**Texample**](https://texample.net)

## **3. Một số minh hoạ của TikZ trong academic**

---
<div style="text-align: center;">
  <img src="/assets/img/fourier_series.png" alt="Fourier Series" style="width: auto; height: auto;">
  <p secession="image-caption" style="font-family: 'Computer Modern', 'Times New Roman', serif; font-size: 16px; margin-top: 10px;">Minh hoạ Fourier Series trong Time Domain và Frequency Domain</p>
</div>

---
<div style="text-align: center;">
  <img src="/assets/img/bayes.png" alt="Minh hoạ xác suất Bayes" style="width: auto; height: auto;">
  <p secession="image-caption" style="font-family: 'Computer Modern', 'Times New Roman', serif; font-size: 16px; margin-top: 10px;">Minh hoạ xác suất Bayes</p>
</div>