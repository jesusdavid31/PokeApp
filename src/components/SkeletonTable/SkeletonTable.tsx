
// Estilos
import "./SkeletonTable.scss";

export default function SkeletonTable() {
    const cols = 7;
    const rows = 10;

    return (
        <div className="sk-table">

            <div className="sk-table__frame">
                <table>
                    <thead>
                        <tr>
                            {Array.from({ length: cols }).map((_, i) => (
                                <th key={i}>
                                    <span className="sk-cell sk-shimmer" />
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                        {Array.from({ length: rows }).map((_, r) => (
                            <tr key={r}>
                                {Array.from({ length: cols }).map((_, c) => (
                                    <td key={c}>
                                        <span className="sk-cell sk-shimmer" />
                                    </td>
                                ))}
                            </tr>
                        ))}
                    </tbody>

                    <tfoot>
                        <tr>
                            <td colSpan={cols}>
                                <div className="sk-pagination">
                                    <div className="sk-page-dots">
                                        <div className="sk-btn lg sk-shimmer" />
                                    </div>
                                    <div className="sk-page-dots">
                                        <div data-testid="button" className="sk-btn sm sk-shimmer" /> {/* Prev */}
                                        <span className="sk-dot sk-shimmer" />
                                        <span className="sk-dot sk-shimmer" />
                                        <span className="sk-dot sk-shimmer" />
                                        <span className="sk-dot sk-shimmer" />
                                        <div className="sk-btn sm sk-shimmer" /> {/* Next */}
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}
