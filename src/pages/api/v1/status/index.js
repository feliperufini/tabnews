import database from '@infra/database'

async function status(_, response) {
	const updatedAt = new Date().toISOString()
	const postgresVersion = await database.query('SHOW server_version;')
	const maxConnections = await database.query('SHOW max_connections;')
	const activeConnections = await database.query({
		text: "SELECT COUNT(*) as active_connections FROM pg_stat_activity WHERE datname=$1 AND state='active';",
		values: [process.env.POSTGRES_DB],
	})

	response.status(200).json({
		updated_at: updatedAt,
		postgres_version: postgresVersion[0].server_version,
		max_connections: Number(maxConnections[0].max_connections),
		active_connections: Number(activeConnections[0].active_connections),
	})
}

export default status
