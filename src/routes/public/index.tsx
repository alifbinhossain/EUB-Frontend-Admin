import Form from '@/pages/fde/form/entry';
import Login from '@/pages/public/login';
import NotFound from '@/pages/public/not-found';
import Success from '@/pages/public/suceessfull';

const publicRoutes = [
	{
		path: '/login',
		element: <Login />,
	},
	// {
	// 	path: '/no-access',
	// 	element: <NoAccess />,
	// },
	{
		path: '/not-found',
		element: <NotFound />,
	},
	{
		path: '*',
		element: <NotFound />,
	},
	{
		path: '/fde/:sem_crs_thr_entry_uuid/:evaluation_time',
		element: <Form />,
	},
	{
		path: '/success',
		element: <Success />,
	},
];

export default publicRoutes;
