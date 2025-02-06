import useSWR from "swr";

async function fetchAPI(key) {
    const response = await fetch(key);
    const responseBody = await response.json();

    return responseBody;
}

export default function StatusPage() {
    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
            }}
        >
            <h1>Status</h1>
            <UpdatedAt />
        </div>
    );
}

function UpdatedAt() {
    const { data, isLoading } = useSWR("/api/v1/status", fetchAPI, {
        refreshInterval: 2000,
    });

    let databaseInfo = {};
    let updatedAtText = "Carregando...";

    if (!isLoading && data) {
        updatedAtText = new Date(data.updated_at).toLocaleString("pt-BR");
        databaseInfo = data.dependencies.database;
    }

    return (
        <>
            <div>Última atualização: {updatedAtText}</div>
            <DatabaseStatus databaseInfo={databaseInfo} />
        </>
    );
}

function DatabaseStatus({ databaseInfo }) {
    const { max_connections, opened_connections, postgres_version } =
        databaseInfo;

    return (
        <div
            style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "1rem",
            }}
        >
            <div>Número máximo de conexões: {max_connections}</div>
            <div>Conexões abertas: {opened_connections}</div>
            <div>Versão do Postgres: {postgres_version}</div>
        </div>
    );
}
