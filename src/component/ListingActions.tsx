'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, Trash2, Loader2 } from 'lucide-react';
import EditStudioDialouge from './EditStudioDialouge';
import { toast } from 'react-toastify';

interface ListingActionsProps {
  id: string; // listing er nijer _id (delete/edit er jonno)
  studioId?: string; // original studio id (view details er jonno)
}

interface Studio {
  _id: string;
  title: string;
  category: string;
  hourlyRate: number | string;
  securityDeposit: number | string;
  maxCapacity: number | string;
  location: string;
  imageUrl: string;
  overview: string;
  amenities?: string[];
}

interface ListingActionsProps {
  id: string;
  studioId?: string;
  studioData?: Studio;
}

const ListingActions = ({ id,studioData, studioId }: ListingActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      setLoading(true);
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/my-listing/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();
console.log({data})
      if (res.ok) {
        toast.success('Listing deleted successfully!');
        router.refresh();
      } else {
        alert(data.message || 'Failed to delete!');
      }
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const iconBtn =
    'inline-flex h-8 w-8 items-center justify-center rounded-lg transition';

  return (
    <div className="flex items-center justify-center gap-2">
      {/* View Details */}
      <Link
        href={`/studios/${studioId ?? id}`}
        title="View details"
        aria-label="View details"
        className={`${iconBtn} bg-blue-50 text-blue-600 hover:bg-blue-100`}
      >
        <Eye size={16} />
      </Link>

      {/* Edit */}
      

      {studioData && <EditStudioDialouge studio={studioData} />}

      {/* Delete */}
      <button
        type="button"
        onClick={handleDelete}
        disabled={loading}
        title="Delete"
        aria-label="Delete listing"
        className={`${iconBtn} bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-60`}
      >
        {loading ? (
          <Loader2 size={16} className="animate-spin" />
        ) : (
          <Trash2 size={16} />
        )}
      </button>
    </div>
  );
};

export default ListingActions;