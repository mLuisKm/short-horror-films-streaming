export default function PageIdentifier({nombre, children}) {
    return (
        <div>
            <h1>{nombre} page</h1>
            {children}
        </div>
    )
}