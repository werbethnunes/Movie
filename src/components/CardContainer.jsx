export default function CardContainer({ titulo, children }) {
    return (
        <div className="mb-8">
            <h2 className="text-3xl font-bold text-purple-400 mb-4">{titulo}</h2>
            <div>{children}</div>
        </div>
    );
}
