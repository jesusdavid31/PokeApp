
// Estilos
import "./AccordionSkeleton.scss";

const AccordionSkeleton = () => {
    return (
        <div className="accordion-skeleton">
            {Array.from({ length: 6 }).map((_, i) => (
                <div className="accordion-item" key={i}>
                    <div className="accordion-summary">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-icon"></div>
                    </div>
                    <div className="accordion-details">
                        <div className="skeleton skeleton-line"></div>
                        <div className="skeleton skeleton-line short"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionSkeleton;
