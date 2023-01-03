import { PER_PAGE } from '@/config/index';
import Link from 'next/link';

const Pagination = ({total, page}) => {
  console.log(total, page);
  const lastPage = Math.ceil(total / PER_PAGE);

  return (
    <div>
      {page > 1 && (
        <Link href={`/events?page=${page - 1}`}>
          <a className='btn-secondary'>Previous</a>
        </Link>
      )}
      {page < lastPage && (
        <Link href={`/events?page=${page + 1}`}>
          <a className='btn-secondary'>Next</a>
        </Link>
      )}
    </div>
  )
}

export default Pagination;