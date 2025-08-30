---
title: Constraint and Randomization in System Verilog
date: 2025-08-30 12:00:00 +0700
categories: [SystemVerilog]
tags: [System Verilog]
langs: [en, vi]
---

Contraint và random là 2 cơ chế built-in cực kì mạnh mẽ của System Verilog giúp hỗ trợ quá trình tạo stimulus hiệu quả và tối ưu!!


## **Randomization và constraint**

Trong SystemVerilog, bạn có thể khai báo:

- Các biến ngẫu nhiên với từ khóa rand hoặc randc
- Các điều kiện ràng buộc với constraint

--> Khi gọi randomize(), hệ thống sẽ tự động sinh giá trị ngẫu nhiên thỏa mãn tất cả các ràng buộc.

```verilog
class Packet;
  rand bit [7:0] src_addr;
  rand bit [7:0] dst_addr;
  rand bit [15:0] payload[];

  constraint c_small_pkt { payload.size() inside {[4:16]}; }
  constraint c_addr     { src_addr != dst_addr; }
  constraint c_broadcast { dst_addr != 8'hFF; } // Không cho broadcast
endclass
```

--> Khi gọi pkt.randomize(), SV sẽ sinh một packet tự động thỏa mãn tất cả ràng buộc.

Thật ra, doạn code trên bạn hoàn toàn có thể viết lại như sau:

```verilog
pkt.src_addr = $urandom_range(0, 255);
pkt.dst_addr = $urandom_range(0, 255);
if (pkt.src_addr == pkt.dst_addr) // fix if invalid
  pkt.dst_addr = pkt.src_addr + 1;
```
**Vậy tại sao không dùng if-else hoặc std::randomize thủ công?**

**1. Không tự động hóa – Dễ lỗi và tốn công**

Bạn phải tự kiểm tra điều kiện sau khi random.
Nếu có nhiều điều kiện (ví dụ: A != B, C in {2,4,6}, D > E, payload size < 100, v.v.), việc kiểm tra bằng if-else trở nên phức tạp, dài dòng, dễ thiếu trường hợp.
Nếu thay đổi yêu cầu, bạn phải sửa lại logic ở nhiều chỗ.
--> Với constraint, bạn chỉ cần định nghĩa điều kiện một lần → hệ thống tự xử lý.

**2. Không hiệu quả với không gian tìm kiếm lớn**

Giả sử bạn cần:
```verilog
constraint { addr % 3 == 0; addr % 5 == 0; addr < 1000; }
```

→ Tức là addr chia hết cho 15 và nhỏ hơn 1000.

Nếu dùng urandom + if, bạn có thể phải random nhiều lần mới trúng giá trị hợp lệ → rất chậm, đặc biệt nếu điều kiện hiếm.

--> constraint solver của SystemVerilog hiểu được biểu thức ràng buộc và có thể sinh trực tiếp giá trị hợp lệ (tối ưu hơn nhiều).

**3. Không hỗ trợ trọng số (weight) và phân bố xác suất**

SystemVerilog cho phép bạn đặt trọng số cho các khoảng giá trị:
```verilog
constraint c_weight {
  src_addr dist { 8'h00 := 10, 8'hFF := 1, [8'h01:8xFE] := 89 };
}
```

→ 10% xác suất là 0x00, 1% là 0xFF, 89% là các giá trị khác.

--> Dùng if-else hoặc $urandom thuần túy không thể làm điều này một cách tự nhiên.

**4. Không hỗ trợ bật/tắt ràng buộc linh hoạt**

Bạn có thể:
```verilog
disable constraint c_addr;
pkt.randomize() with { src_addr == 8'h10; }; // thêm điều kiện tại thời điểm gọi
```
--> Rất hữu ích để kiểm thử các trường hợp biên (corner cases).

Với if-else, bạn phải viết lại logic kiểm tra ở từng trường hợp → khó tái sử dụng.

**5. Không tích hợp với functional coverage và UVM**

- Functional coverage có thể theo dõi xem các ràng buộc đã tạo đủ sự đa dạng chưa.
- UVM dùng constraint để xây dựng các sequence kiểm thử tự động, có thể override ở testcase con.
- Các công cụ như coverage closure dựa vào constraint để đánh giá độ bao phủ.
--> Dùng if-else thủ công không tương thích với các phương pháp verification hiện đại.
