const space = process.env.NEXT_PUBLIC_CONTENTFUL_SPACE_ID;
const accessToken = process.env.NEXT_PUBLIC_CONTENTFUL_ACCESS_TOKEN;

const client = require("contentful").createClient({
  space: space,
  accessToken: accessToken,
});

let entries = null;

export async function getAllPosts() {
  entries = await client.getEntries();
  const articles = entries.items.map((item) => ({
    id: item.sys.id,
    title: item.fields.title,
    body: item.fields.body,
    date: item.sys.createdAt
  }));

  if (articles) return articles;
  console.log(`Error getting Entries for ${contentType.name}.`);
}

export async function getAllPostIds() {
  if (!entries) await getAllPosts();
  return entries.items.map((item) => ({
    params: { id: item.sys.id },
  }));
}

export async function getPostById(id) {
  const item = await client.getEntry(id);
  return {
    id: item.sys.id,
    title: item.fields.title,
    body: item.fields.body,
    date: item.sys.createdAt,
  };
}
