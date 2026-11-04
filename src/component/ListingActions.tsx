'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Eye, Pencil, Trash2, Loader2 } from 'lucide-react';

interface ListingActionsProps {
  id: string; // listing er nijer _id (delete/edit er jonno)
  studioId?: string; // original studio id (view details er jonno)
}

const ListingActions = ({ id, studioId }: ListingActionsProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this listing?')) return;

    try {
      setLoading(true);
      const res = await fetch(`http://localhost:8000/my-listing/${id}`, {
        method: 'DELETE',
      });
      const data = await res.json();

      if (res.ok) {
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
      <Link
        href={`/edit-listing/${id}`}
        title="Edit"
        aria-label="Edit listing"
        className={`${iconBtn} bg-amber-50 text-amber-600 hover:bg-amber-100`}
      >
        <Pencil size={16} />
      </Link>

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