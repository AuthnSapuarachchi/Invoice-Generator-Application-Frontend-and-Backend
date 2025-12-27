import { templates } from "../assets/assets.js";
import { Check, Eye } from "lucide-react";
import { useState } from "react";

// Template Card Component
const TemplateCard = ({ template, onClick, isSelected }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <div 
            className="position-relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <div
                className={`card border-0 h-100 overflow-hidden ${isSelected ? 'shadow-lg' : 'shadow-sm'}`}
                onClick={() => onClick(template.id)}
                style={{
                    cursor: 'pointer',
                    borderRadius: '16px',
                    transition: 'all 0.3s ease',
                    transform: isHovered ? 'translateY(-8px) scale(1.02)' : 'translateY(0) scale(1)',
                    border: isSelected ? '3px solid #0d6efd' : '3px solid transparent'
                }}
            >
                {/* Template Image */}
                <div 
                    className="position-relative overflow-hidden"
                    style={{ height: '280px' }}
                >
                    <img
                        src={template.image}
                        alt={template.label}
                        className="w-100 h-100"
                        loading="lazy"
                        style={{ 
                            objectFit: 'cover',
                            transition: 'transform 0.3s ease'
                        }}
                    />
                    
                    {/* Overlay on Hover */}
                    <div 
                        className="position-absolute top-0 start-0 w-100 h-100 d-flex align-items-center justify-content-center"
                        style={{
                            background: 'rgba(0,0,0,0.5)',
                            opacity: isHovered ? 1 : 0,
                            transition: 'opacity 0.3s ease',
                            backdropFilter: 'blur(2px)'
                        }}
                    >
                        <div className="d-flex flex-column align-items-center gap-2">
                            <div 
                                className="d-flex align-items-center justify-content-center bg-white"
                                style={{
                                    width: '56px',
                                    height: '56px',
                                    borderRadius: '50%',
                                    transition: 'transform 0.2s'
                                }}
                            >
                                <Eye size={24} className="text-primary" />
                            </div>
                            <span className="text-white fw-semibold">Preview</span>
                        </div>
                    </div>

                    {/* Selected Badge */}
                    {isSelected && (
                        <div 
                            className="position-absolute top-0 end-0 m-3"
                            style={{
                                animation: 'fadeIn 0.3s ease'
                            }}
                        >
                            <div 
                                className="d-flex align-items-center justify-content-center bg-primary"
                                style={{
                                    width: '36px',
                                    height: '36px',
                                    borderRadius: '50%',
                                    boxShadow: '0 4px 12px rgba(13, 110, 253, 0.4)'
                                }}
                            >
                                <Check size={20} className="text-white" strokeWidth={3} />
                            </div>
                        </div>
                    )}
                </div>

                {/* Template Label */}
                <div 
                    className={`card-body text-center py-3 ${isSelected ? 'bg-primary bg-opacity-10' : 'bg-light'}`}
                    style={{ transition: 'background-color 0.3s' }}
                >
                    <h6 className={`mb-0 fw-semibold ${isSelected ? 'text-primary' : 'text-dark'}`}>
                        {template.label}
                    </h6>
                    {isSelected && (
                        <small className="text-primary fw-medium">Currently Selected</small>
                    )}
                </div>
            </div>
        </div>
    );
};

const TemplateGrid = ({ onTemplateClick, selectedTemplate }) => {
    return (
        <div className="template-grid-container" style={{ padding: '8px' }}>
            {/* Header */}
            <div className="mb-4">
                <div className="d-flex align-items-center justify-content-between mb-2">
                    <h5 className="mb-0 fw-bold">Choose Template</h5>
                    <span className="badge bg-light text-dark border px-3 py-2">
                        {templates.length} Templates
                    </span>
                </div>
                <p className="text-muted small mb-0">
                    Select a professional template for your invoice
                </p>
            </div>

            {/* Template Grid */}
            <div className="row g-4">
                {templates.map((template) => (
                    <div className="col-12 col-sm-6 col-lg-4" key={template.id}>
                        <TemplateCard 
                            template={template}
                            onClick={onTemplateClick}
                            isSelected={selectedTemplate === template.id}
                        />
                    </div>
                ))}
            </div>

            {/* Info Text */}
            <div className="mt-4 text-center">
                <p className="text-muted small mb-0">
                    💡 Click any template to preview your invoice
                </p>
            </div>

            {/* CSS Animation */}
            <style jsx>{`
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                        transform: scale(0.8);
                    }
                    to {
                        opacity: 1;
                        transform: scale(1);
                    }
                }
            `}</style>
        </div>
    );
};

export default TemplateGrid;