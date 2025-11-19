/**
 * makecode UART Binary communication module Package
 * By 2025 Socionext Inc. and ZETA alliance Japan
 * Written by M.Urade　2025/11/19
 */

/**
 * UART communication over binary
 */

//% weight=100 color=#6A0DAD icon="\uf287" block="UART_Bin" advanced=true
namespace UART_BIN {
    let buffer: Buffer = Buffer.create(0)
    let dataBuffer = pins.createBuffer(1);
    let l = 0
 
    /**
     * Binary data transmission over UART
     * @param TX_data: 8bit data 
    */
    //% blockId=UART_BIN_TX block="Uart bin TX %TX_data"
    //% weight=80 blockGap=8
    export function UART_BIN_TX(TX_data: number): void {
        dataBuffer.setUint8(0, TX_data);
        // Write buffer to serial port
        serial.writeBuffer(dataBuffer)
    }

    /**
     * Binary data reception over UART
     * @param value: none
     * @return value: 16bit data If return value is 256, reception time out. 
    */
    // Check RX up to 256 times
    // If data reception is OK, return reciept data, if not, retunr 0x100
    //% blockId=UART_BIN_RX block="Uart bin RX"
    //% weight=80 blockGap=8
    export function UART_BIN_RX(): number {
        buffer = serial.readBuffer(1)
        if (buffer.length > 0) {
            return buffer[0]
        }
        return 0x100
    }
}