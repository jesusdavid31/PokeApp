
// Estilos
import "./AccordionSkeleton.scss";

const AccordionSkeleton = () => {
    return (
        <div className="accordion-skeleton">
            {Array.from({ length: 7 }).map((_, i) => (
                <div className="accordion-item" key={i}>
                    <div className="accordion-summary">
                        <div className="skeleton skeleton-title"></div>
                        <div className="skeleton skeleton-icon"></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AccordionSkeleton;
