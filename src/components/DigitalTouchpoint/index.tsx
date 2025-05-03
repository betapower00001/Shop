import { FaCheckCircle } from "react-icons/fa";
import TouchpointImage from "../Img/img-16-05-1.jpg"; // เปลี่ยน path ตามไฟล์จริง

const DigitalTouchpoint: React.FC = () => {
    return (
        <section className="py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* ข้อความด้านซ้าย */}
                    <div className="col-lg-7">
                        <span className="badge bg-light text-primary fw-bold px-3 py-2 mb-2 rounded-pill" style={{fontSize:'18px'}}>
                            เชื่อมต่อกับกลุ่มเป้าหมายบน
                        </span>
                        <h2 className="fw-bold text-dark mb-3">Digital Platform Touchpoint</h2>
                        <p className="text-muted mb-4" style={{fontSize:'18px'}}>
                            Marketing Automation จะช่วยธุรกิจของคุณ
                        </p>

                        <div className="col-lg-7 px-0 text-start" >
                            <div className="mb-3 d-flex align-items-start">
                                <FaCheckCircle className="text-primary me-2 fs-4 mt-1" />
                                <div>
                                    <h5 className="mb-1 fw-bold text-dark">Website Strategy</h5>
                                    <p className="text-muted mb-0" style={{fontSize:'18px'}}>
                                        เปลี่ยน Visitor ให้กลายเป็น Lead <br />
                                        ด้วยการสร้างเว็บไซต์ให้น่าสนใจ และรองรับ<br />
                                        การจัดเก็บข้อมูลของ Lead เพื่อดำเนินการทำ Marketing Automation
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3 d-flex align-items-start">
                                <FaCheckCircle className="text-primary me-2 fs-4 mt-1" />
                                <div>
                                    <h5 className="mb-1 fw-bold text-dark">Online Advertising</h5>
                                    <p className="text-muted mb-0" style={{fontSize:'18px'}}>
                                        สร้างการรับรู้ ขยายฐานลูกค้าเข้าถึงกลุ่มเป้าหมายด้วยวิธีการเชิงรุก
                                    </p>
                                </div>
                            </div>

                            <div className="mb-3 d-flex align-items-start">
                                <FaCheckCircle className="text-primary me-2 fs-4 mt-1" />
                                <div>
                                    <h5 className="mb-1 fw-bold text-dark">Search Marketing</h5>
                                    <p className="text-muted mb-0" style={{fontSize:'18px'}}>
                                        การทำ SEO และ SEM เพิ่มโอกาสการค้นหาในช่องทางออนไลน์ตลอด 24 ชม.
                                    </p>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* รูปภาพด้านขวา */}
                    <div className="col-lg-5 text-center">
                        <img
                            src={TouchpointImage.src}
                            alt="Marketing Touchpoint"
                            className="img-fluid rounded"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default DigitalTouchpoint;
