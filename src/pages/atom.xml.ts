import type { APIRoute } from 'astro';
import { getCollection } from 'astro:content';
import { site } from '../config';

export const GET: APIRoute = async () => {
  const posts = (await getCollection('blog'))
    .sort((a, b) => b.data.date.getTime() - a.data.date.getTime())
    .slice(0, 20);

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom">
  <title>${site.title}</title>
  <link href="${site.url}/atom.xml" rel="self"/>
  <link href="${site.url}/"/>
  <id>${site.url}/</id>
  <updated>${posts[0]?.data.date.toISOString() || new Date().toISOString()}</updated>
  ${posts.map(post => `<entry>
    <title>${post.data.title.replace(/&/g, '&amp;').replace(/</g, '&lt;')}</title>
    <link href="${site.url}/blog/${post.slug}"/>
    <id>${site.url}/blog/${post.slug}</id>
    <published>${post.data.date.toISOString()}</published>
    <updated>${post.data.date.toISOString()}</updated>
  </entry>`).join('\n  ')}
</feed>`;

  return new Response(feed, {
    headers: { 'Content-Type': 'application/atom+xml; charset=utf-8' },
  });
};
