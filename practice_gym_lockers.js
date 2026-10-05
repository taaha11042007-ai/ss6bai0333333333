
let memberCard = "";
let memberType = "";
let isValidCard = false;

let towelQuantity = 0;
let lockQuantity = 0;

let towelPrice = 20000;
let lockPrice = 15000;
let deposit = 50000;

do {
    console.log("\n" + "=".repeat(45));
    console.log("       GYM FITNESS - QUẢN LÝ TỦ ĐỒ");
    console.log("=".repeat(45));
    console.log("1. Tiếp nhận và xác thực thẻ hội viên");
    console.log("2. Ghi nhận vật tư mượn thêm");
    console.log("3. In phiếu bàn giao tủ đồ");
    console.log("4. Đóng ca làm việc và thoát");
    console.log("=".repeat(45));

    let choice = prompt("Nhập lựa chọn: ").trim();

    switch (choice) {
        case "1":
            memberCard = prompt("Nhập mã thẻ hội viên: ")
                .trim()
                .toUpperCase();

            if (memberCard.startsWith("GYM-VIP-")) {
                memberType = "VIP";
                isValidCard = true;
                console.log("Xác thực thẻ thành công!");
                console.log("Hạng hội viên: VIP");
                console.log("Tủ được cấp: ZONE-A");
            } else if (memberCard.startsWith("GYM-STANDARD-")) {
                memberType = "STANDARD";
                isValidCard = true;
                console.log("Xác thực thẻ thành công!");
                console.log("Hạng hội viên: STANDARD");
                console.log("Tủ được cấp: ZONE-B");
            } else {
                memberType = "";
                isValidCard = false;
                console.log("Thẻ hội viên không hợp lệ!");
            }

            break;

        case "2":
            if (!isValidCard) {
                console.log("Vui lòng xác thực thẻ hội viên trước!");
                break;
            }

            let materialLog = prompt(
                "Nhập vật tư mượn thêm (TOWEL:2|LOCK:1): "
            ).trim().toUpperCase();

            towelQuantity = 0;
            lockQuantity = 0;

            let start = 0;

            for (let i = 0; i < materialLog.length; i++) {
                if (materialLog[i] === "|" || i === materialLog.length - 1) {
                    let end = i;

                    if (i === materialLog.length - 1) {
                        end = i + 1;
                    }

                    let item = materialLog.slice(start, end);
                    let colonIndex = item.indexOf(":");

                    if (colonIndex !== -1) {
                        let itemCode = item.slice(0, colonIndex);
                        let quantity = Number(item.slice(colonIndex + 1));

                        if (itemCode === "TOWEL") {
                            towelQuantity += quantity;
                        } else if (itemCode === "LOCK") {
                            lockQuantity += quantity;
                        }
                    }

                    start = i + 1;
                }
            }

            console.log("Đã ghi nhận vật tư mượn thêm.");
            console.log("Khăn tắm: " + towelQuantity);
            console.log("Khóa tủ: " + lockQuantity);

            break;

        case "3":
            if (!isValidCard) {
                console.log("Vui lòng xác thực thẻ hội viên trước!");
                break;
            }

            let towelFree = 0;

            if (memberType === "VIP") {
                towelFree = 1;
            }

            let extraTowel = towelQuantity - towelFree;

            if (extraTowel < 0) {
                extraTowel = 0;
            }

            let towelFee = extraTowel * towelPrice;
            let lockFee = lockQuantity * lockPrice;
            let materialFee = towelFee + lockFee;

            console.log("\n" + "-".repeat(50));
            console.log("             PHIẾU BÀN GIAO TỦ ĐỒ");
            console.log("-".repeat(50));
            console.log("Mã thẻ      : " + memberCard);
            console.log("Hạng        : " + memberType);

            if (memberType === "VIP") {
                console.log("Khu vực tủ   : ZONE-A");
                console.log("Khăn miễn phí: 1 chiếc");
            } else {
                console.log("Khu vực tủ   : ZONE-B");
            }

            console.log("-".repeat(50));
            console.log("Vật tư".padStart(15) +
                "SL".padStart(8) +
                "Phụ phí".padStart(15));

            console.log("-".repeat(50));

            console.log(
                "Khăn tắm".padStart(15) +
                String(extraTowel).padStart(8) +
                (towelFee.toLocaleString("vi-VN") + " VNĐ").padStart(15)
            );

            console.log(
                "Khóa tủ".padStart(15) +
                String(lockQuantity).padStart(8) +
                (lockFee.toLocaleString("vi-VN") + " VNĐ").padStart(15)
            );

            console.log("-".repeat(50));
            console.log(
                "Phụ phí vật tư: " +
                materialFee.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Tiền đặt cọc  : " +
                deposit.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Tổng thu      : " +
                (materialFee + deposit).toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log(
                "Tiền cọc hoàn : " +
                deposit.toLocaleString("vi-VN") +
                " VNĐ"
            );
            console.log("-".repeat(50));

            break;

        case "4":
            console.log("\nĐã đóng ca làm việc.");
            console.log("Hẹn gặp lại!");
            break;

        default:
            console.log("Lựa chọn không hợp lệ!");
            break;
    }

    if (choice === "4") {
        break;
    }

} while (true);
