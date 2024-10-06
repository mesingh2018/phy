import { topicData } from '@/lib/topic-data';

export async function generateStaticParams() {
  return Object.keys(topicData).map((topic) => ({
    topic: topic,
  }));
}

export default function TopicPage({ params }: { params: { topic: string } }) {
  const topic = topicData[params.topic as keyof typeof topicData];

  if (!topic) {
    return <div>Topic not found</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">{topic.title}</h1>
      {/* Add your topic content here */}
    </div>
  );
}