import { NextPage } from 'next';
import LinkFetcher from  "@/app/custom_components/LinkFetcher" // Adjust the import path as needed

const LinkFetcherPage: NextPage = () => {
  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Link Fetcher</h1>
      <LinkFetcher />
    </div>
  );
};

export default LinkFetcherPage;