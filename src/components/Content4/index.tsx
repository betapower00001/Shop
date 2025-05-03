import Banner from '../Img/img-16-02-1.jpg';

const MarketingConsultSection = () => {
    return (
        <div className="container py-5">
            <div className="row align-items-center">
                {/* ภาพด้านซ้าย */}
                <div className="col-md-6 mb-4 mb-md-0">
                    <img
                        src={Banner.src}
                        alt="team working"
                        style={{ borderRadius: '80px 0 0 0' }}
                    />
                </div>

                {/* เนื้อหาด้านขวา */}
                <div className="col-md-6">
                    <h2 className="fw-bold mb-3" style={{color:'#1b2e59'}}>
                        ปรึกษาด้านการตลาดสาย มูเตรู <br />แบบครบวงจร
                    </h2>
                    <p className="mb-4" style={{textAlign:'left', fontSize:'18px',color: '#5a5a5a'}}>
                        ให้บริการที่หลากหลายและครบวงจร เพื่อช่วยธุรกิจ ของคุณเติบโตด้วยกลยุทธ์การตลาดออนไลน์ที่มีประสิทธิภาพ เพิ่มการรับรู้แบรนด์ ยอดขายและสร้างความสัมพันธ์ที่ยั่งยืน กับลูกค้าของคุณ
                    </p>

                    <div className="row g-3">
                        <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-share-alt me-2 text-primary fs-5"></i>
                                <span>Social Media</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-globe me-2 text-primary fs-5"></i>
                                <span>Website For Business</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-search me-2 text-primary fs-5"></i>
                                <span>SEO, SEM</span>
                            </div>
                        </div>
                        <div className="col-12 col-md-6">
                            <div className="d-flex align-items-center">
                                <i className="fas fa-user-friends me-2 text-primary fs-5"></i>
                                <span>Influencer & KOL</span>
                            </div>
                        </div>
                    </div>



                    <div className="d-flex align-items-center mt-4">
                        <div className="me-3">
                            <strong>1500+</strong> <br />
                            Happy Review
                        </div>
                        <div className="text-primary display-6 fw-bold">4.9/5</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MarketingConsultSection;
