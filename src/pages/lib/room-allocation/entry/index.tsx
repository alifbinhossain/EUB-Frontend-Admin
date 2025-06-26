import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

import Entry1 from '../entry-1';
import Entry2 from '../entry-2';
import Entry3 from '../entry-3';

const Entry = () => {
	return (
		<div className='mx-auto w-full p-6'>
			<div className='mb-6'>
				<h1 className='text-3xl font-bold'>Room Allocation Demos</h1>
				<p className='text-muted-foreground'>Explore different room allocation demos using the tabs below</p>
			</div>

			<Tabs defaultValue='demo1' className='w-full'>
				<TabsList className='grid w-full grid-cols-3'>
					<TabsTrigger value='demo1'>Demo 1</TabsTrigger>
					<TabsTrigger value='demo2'>Demo 2</TabsTrigger>
					<TabsTrigger value='demo3'>Demo 3</TabsTrigger>
				</TabsList>

				<TabsContent value='demo1' className='mt-6'>
					<Entry1 />
				</TabsContent>

				<TabsContent value='demo2' className='mt-6'>
					<Entry2 />
				</TabsContent>

				<TabsContent value='demo3' className='mt-6'>
					<Entry3 />
				</TabsContent>
			</Tabs>
		</div>
	);
};

export default Entry;
