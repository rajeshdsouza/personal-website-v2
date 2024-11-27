import Parser from 'rss-parser';
import fetch from 'node-fetch';

export interface MediumPost {
  title: string;
  link: string;
  pubDate: string;
  description: string;
  categories: string[];
}

export async function getMediumPosts(username: string, category?: string): Promise<MediumPost[]> {
  try {
    const response = await fetch(`https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@${username}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status}`);
    }

    const data = await response.json();
    
    if (data.status !== 'ok') {
      throw new Error('Failed to parse feed');
    }

    return data.items
      .map(item => ({
        title: item.title,
        link: item.link,
        pubDate: new Date(item.pubDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        }),
        description: item.description.replace(/<[^>]*>/g, '').slice(0, 150) + '...',
        categories: item.categories || []
      }))
      .filter(post => !category || post.categories.map(c => c.toLowerCase()).includes(category.toLowerCase()));
  } catch (error) {
    console.error('Error fetching Medium posts:', error);
    return [];
  }
}