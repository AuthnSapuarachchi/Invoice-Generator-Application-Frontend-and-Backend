import {templates} from "../assets/assets.js";

const TemplateGrid = ({onTemplateClick}) => {
    return (
        <div className="container-fluid p-3">
            <div className="row g-4">
                {templates.map(({id, label, image}) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={id}>
                        <div
                            className="card h-80 shadow-sm border"
                            onClick={() => onTemplateClick(id)}
                            style={{cursor: 'pointer'}}
                        >
                            <img
                                src={image}
                                alt={label}
                                className="card-img-top"
                                loading="lazy"
                                style={{height: '300px', objectFit: 'cover'}}
                            />
                            <div className="card-body text-center bg-light">
                                <h6 className="card-title mb-0 fw-semibold">{label}</h6>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default TemplateGrid;