---
title: System Verilog 
date: 2025-08-30 12:00:00 +0700
categories: [SystemVerilog]
tags: [System Verilog]
langs: [en, vi]
---

SystemVerilog được ưa chuộng trong verification hơn Verilog vì nó mở rộng và cải tiến đáng kể các tính năng của Verilog, đặc biệt là base infrastructure của các UVM Test Bench!

Dưới đây là tổng hợp những khái niệm căn bản bạn cần biết trước khi tìm hiểu về UVM!

> Essential Concept

## **1. Object Oriented Programming**

System Verilog hỗ trợ đầy đủ các khái niệm của OOP như:

- **Class**
- **Inheritance (kế thừa)**
- **Polimorphism (đa hình)**
- **Encapsulation (bao đóng)**
- **Abstraction (trừu tượng)**

--> OOP giúp xây dựng các testbench linh hoạt, có thể tái sử dụng, dễ bảo trì và mở rộng.

## **2. Advanced Data Type**

System verilog có sự nâng cấp đáng kể về data type, hỗ trợ mạnh mẽ các data type mới như:

- Dynamic arrays, associative arrays, queues
- Structs, unions
- Typedef 

--> Giúp xử lý dữ liệu phức tạp dễ dàng hơn.

## **3. Randomization và constraint**

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
[**Vậy tại sao không dùng if-else hoặc std::randomize thủ công?**](/posts/constraint_and_randomization/)

## **4. Functional Coverage**

SystemVerilog hỗ trợ functional coverage – một tiêu chí quan trọng để đánh giá coverage.
```verilog
covergroup my_cg;
  coverpoint src_addr {
    bins low = [0, 63];
    bins high = [64, 255];
  }
endcovergroup
```

## **5. Interface**

Interface là một khối đóng gói các signals, modport, clocking block và đôi khi nó bao gồm một số method/task/function. 

```verilog
interface packet_if (input logic clk);
  logic        valid;
  logic [7:0]  data;
  logic        ready;
  logic        req;
  logic        ack;
  logic [3:0]  mode;

  // Định nghĩa vai trò
  modport driver (output valid, data, req, mode, input ready, ack);
  modport monitor (input valid, data, ready, req, ack, mode);
endinterface
```

--> Nó giúp giảm sự phức tạp khi kết nối và tăng khả năng tái sử dụng của testbench.

## **6. Synchrounous**

Synchronization (đồng bộ hóa) trong SystemVerilog là một khái niệm rất quan trọng, đặc biệt trong verification, nơi nhiều tiến trình (process) chạy song song và cần trao đổi dữ liệu hoặc chờ đợi lẫn nhau một cách an toàn và có kiểm soát.

### **6.1. Event**
```verilog
event data_sent, ack_received;

// Tiến trình 1: Gửi tín hiệu sự kiện
initial begin
  #10;
  $display("Data sent");
  -> data_sent; // Kích hoạt sự kiện
end

// Tiến trình 2: Chờ sự kiện
initial begin
  wait(data_sent); // Chờ đến khi data_sent được kích hoạt
  $display("ACK sent after data");
  -> ack_received;
end
```
### **6.2. Semaphore**
```verilog
semaphore resource = new(2); // Chỉ có 2 tài nguyên

initial begin
  resource.get(1); // Lấy 1 tài nguyên
  $display("Process 1 using resource");
  #20;
  resource.put(1); // Trả lại
end

initial begin
  resource.get(1); // Nếu hết tài nguyên, sẽ chờ
  $display("Process 2 using resource");
end
```

### **6.3. Mailbox**
Dùng để gửi và nhận dữ liệu giữa các tiến trình, giống như queue nhưng an toàn khi dùng song song.

``` verilog
mailbox #(int) mb = new(); // Mailbox cho kiểu int

initial begin
  mb.put(42);
  mb.put(100);
  $display("Sent data");
end

initial begin
  int data;
  mb.get(data); // Chờ nếu chưa có dữ liệu
  $display("Received: %0d", data);
end
```

- **Ưu điểm:**
    - An toàn khi nhiều tiến trình dùng chung
    - Có thể đặt giới hạn kích thước: new(10)
    - Hỗ trợ blocking (get, put) và non-blocking (try_get, try_put)

- **Ứng dụng:**
    - Giao tiếp giữa driver và sequencer trong UVM
    - Gửi packet, transaction giữa các agent

### **6.4. wait statement – Chờ điều kiện**
Chờ DUT xử lý xong, handshake

```verilog
initial begin
  wait (ready == 1); // Chờ tín hiệu ready lên 1
  data = 8'hAA;
end
```
### **6.5. @ và ## trong Assertion (SVA) – Đồng bộ theo clock**
Trong SystemVerilog Assertion (SVA), bạn có thể đồng bộ theo clock:
```verilog
property p1;
  @(posedge clk) req |=> ack; // req thì ack ở cycle kế
endproperty
```
Hoặc dùng ## để chỉ độ trễ theo chu kỳ clock:
```verilog
req ##1 valid ##2 data_valid; // valid sau 1 cycle, data_valid sau 2 cycle tiếp
```

### **6.6. Parallel processing – Kiểm soát tiến trình song song**
- fork ... join: Chờ tất cả tiến trình con xong
- fork ... join_any: Chờ ít nhất 1 tiến trình xong
- fork ... join_none: Không chờ, chạy nền
```verilog
fork
  begin #10 $display("A"); end
  begin #20 $display("B"); end
join // Chờ cả A và B xong mới tiếp tục
$display("Done");
```
