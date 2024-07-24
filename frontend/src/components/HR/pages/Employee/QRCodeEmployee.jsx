import React, { useRef } from 'react'
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode'
import QRCode from 'qrcode.react'
import { Button } from 'primereact/button'
import { PrimeIcons } from 'primereact/api'
import html2canvas from 'html2canvas';


function QRCodeEmployee(props) {

    const qrRef = useRef(null)
    const DownloadQR = (e) => {
        const canvas = document.getElementById(props.data.id);
        const pngUrl = canvas
            .toDataURL("image/png")
            .replace("image/png", "image/octet-stream");
        let downloadLink = document.createElement("a");
        downloadLink.href = pngUrl;
        downloadLink.download = props.data.name+".png";
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
    }
    return (
        <React.Fragment>
            <div className="d-flex justify-content-end">
                <Button className='p-button-sm p-button-info' label='Download QR' icon={PrimeIcons.QRCODE} onClick={DownloadQR} />
            </div>
            <div className="d-flex justify-content-center">
            <QRCode id={props.data.id} value={props.data.id} size={150} ref={qrRef} />
        </div>
        </React.Fragment>
    )
}

export default QRCodeEmployee