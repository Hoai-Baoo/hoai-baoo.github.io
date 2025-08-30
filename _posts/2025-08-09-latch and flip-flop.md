---
title: Latch and Flip-Flop
date: 2025-08-09 12:00:00 +0700
categories: [Logic Design]
tags: [latch, flipflop]
---

Latch và Flip-Flop là những phần tử cơ bản mà mọi IP đều có, hôm nay chúng ta cùng tìm hiểu về bản chất của latch và flip-flop là gì nhé!

## 1. Latch và Flip-Flop là gì?

- Latch: Là một mạch nhớ cơ bản, lưu trữ trạng thái (0 hoặc 1) dựa trên tín hiệu điều khiển (thường gọi là Enable). Latch hoạt động level-sensitive, tức là đầu ra thay đổi ngay khi tín hiệu điều khiển ở mức hoạt động (ví dụ: mức cao hoặc thấp) và đầu vào thay đổi.


- Module D Latch (level-sensitive)
```verilog
module d_latch (
    input wire D,      // Đầu vào dữ liệu
    input wire EN,     // Tín hiệu Enable (mức cao hoạt động)
    output reg Q,      // Đầu ra
    output wire Qn     // Đầu ra ngược
);
    // Gán giá trị cho Q khi EN ở mức cao
    always @(EN or D) begin
        if (EN)
            Q <= D;
    end

    // Đầu ra ngược
    assign Qn = ~Q;
endmodule
```

- Flip-Flop: Là một mạch nhớ đồng bộ, chỉ lấy mẫu và cập nhật đầu ra tại một thời điểm cụ thể, thường là cạnh lên (rising edge) hoặc cạnh xuống (falling edge) của tín hiệu clock.

- Module D Flip-Flop (edge-sensitive)
```verilog
module d_flipflop (
    input wire D,      // Đầu vào dữ liệu
    input wire CLK,    // Tín hiệu clock
    output reg Q,      // Đầu ra
    output wire Qn     // Đầu ra ngược
);
    // Cập nhật Q tại cạnh lên của CLK
    always @(posedge CLK) begin
        Q <= D;
    end

    // Đầu ra ngược
    assign Qn = ~Q;
endmodule
```

