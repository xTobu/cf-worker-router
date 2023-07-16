import { Router, createCors } from 'itty-router';
const { preflight, corsify } = createCors({
	methods: ['GET', 'PATCH', 'POST'],
	origins: ['http://127.0.0.1:5173'],
	headers: {
		'my-funky-header': 'is pretty funky indeed',
	},
});
// now let's create a router (note the lack of "new")
const router = Router();
router.all('*', preflight);
// GET collection index
router.get('/api/todos', () => new Response('Todos Index!'));

// GET item
router.get('/api/todos/:id', ({ params }) => {
	return corsify(new Response(`Todo #${params.id}`));
});

// POST to the collection (we'll use async here)
router.post('/api/todos', async (request) => {
	const content = await request.json();

	return new Response('Creating Todo: ' + JSON.stringify(content));
});

// 404 for everything else
router.all('*', () => new Response('Not Found.', { status: 404 }));

export default router;
