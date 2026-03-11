import { useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useAuth } from '@/store/useAuth';
import { ShieldAlert, ArrowLeft, Loader2, CreditCard, CheckCircle2, RefreshCw } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useQuery, useQueryClient } from '@tanstack/react-query';

// Deterministic mock ID from vehicle number + challan index to ensure
// stable React keys across re-renders (Math.random() would break it)
const seedId = (vehicleNo: string, suffix: string) => {
    const hash = vehicleNo.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    return `CHLN-${hash.toString(16).toUpperCase().padStart(4, '0')}${suffix}`;
};

const fetchChallansAPI = async (vehicleNo: string) => {
    // TODO: Replace with actual Supabase Edge Function call:
    // const { data, error } = await supabase.functions.invoke('fetch-challans', { body: { vehicleNo } })
    await new Promise(resolve => setTimeout(resolve, 1500));

    return [
        {
            id: seedId(vehicleNo, '-01'),
            vehicleNo,
            amount: 1500,
            reason: "Over Speeding",
            location: "NH-48 Speed Cameras",
            date: new Date(Date.now() - 86400000 * 2).toISOString(),
            status: "UNPAID",
        },
        {
            id: seedId(vehicleNo, '-02'),
            vehicleNo,
            amount: 500,
            reason: "Without Helmet",
            location: "City Center Checkpoint",
            date: new Date(Date.now() - 86400000 * 15).toISOString(),
            status: "UNPAID",
        },
    ];
};

const ChallanResults = () => {
    const [searchParams] = useSearchParams();
    const vehicleNo = searchParams.get('vehicle');
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { user, isLoading: authLoading, openAuthModal } = useAuth();

    // Auth guard — wait for auth to settle before redirecting
    // This avoids false redirects on initial load when user is still being fetched
    useEffect(() => {
        if (!authLoading && !user) {
            navigate('/');
            openAuthModal(`/challans?vehicle=${encodeURIComponent(vehicleNo || '')}`);
        }
    }, [user, authLoading, navigate, openAuthModal, vehicleNo]);

    const { data: challans, isLoading, error, refetch } = useQuery({
        queryKey: ['challans', vehicleNo],
        queryFn: () => fetchChallansAPI(vehicleNo!),
        enabled: !!vehicleNo && !!user && !authLoading,
        staleTime: 1000 * 60 * 5, // 5 minutes — don't re-fetch on revisit
    });

    // Render null while auth is loading or user is not authenticated
    if (authLoading || !user) return null;

    return (
        <div className="min-h-screen bg-gray-50/50 pt-24 pb-32">
            <div className="max-w-4xl mx-auto px-4 sm:px-6">

                {/* Page Header */}
                <div className="flex items-center gap-4 mb-8">
                    <button
                        onClick={() => navigate('/')}
                        aria-label="Go back to home"
                        className="p-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition"
                    >
                        <ArrowLeft size={20} className="text-gray-600" />
                    </button>
                    <div>
                        <h1 className="text-2xl sm:text-3xl font-black text-gray-900 leading-tight">Challan Records</h1>
                        <p className="text-gray-500 font-medium">
                            Vehicle: <span className="text-emerald-600 font-bold uppercase tracking-wider">{vehicleNo || 'Unknown'}</span>
                        </p>
                    </div>
                </div>

                {/* Content State Machine */}
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="loading"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-white rounded-3xl border border-gray-100 shadow-sm p-16 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <div className="relative">
                                <div className="w-16 h-16 rounded-full border-4 border-emerald-100" />
                                <Loader2 size={40} className="text-emerald-500 animate-spin absolute inset-0 m-auto" />
                            </div>
                            <h3 className="text-lg font-bold text-gray-900">Fetching Records from NTA...</h3>
                            <p className="text-gray-500 font-medium max-w-sm">Establishing a secure connection to retrieve your official vehicle records.</p>
                        </motion.div>
                    ) : error ? (
                        <motion.div
                            key="error"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-red-50 rounded-3xl border border-red-100 shadow-sm p-16 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <ShieldAlert size={48} className="text-red-400" />
                            <h3 className="text-lg font-bold text-red-900">Connection Failed</h3>
                            <p className="text-red-600 font-medium max-w-sm">Failed to retrieve records. Please check the vehicle number and try again.</p>
                            <button
                                onClick={() => {
                                    queryClient.removeQueries({ queryKey: ['challans', vehicleNo] });
                                    refetch();
                                }}
                                className="flex items-center gap-2 bg-red-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-red-700 transition mt-2"
                            >
                                <RefreshCw size={16} />
                                Retry Search
                            </button>
                        </motion.div>
                    ) : challans?.length === 0 ? (
                        <motion.div
                            key="empty"
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            className="bg-emerald-50 rounded-3xl border border-emerald-100 shadow-sm p-16 flex flex-col items-center justify-center text-center space-y-4"
                        >
                            <CheckCircle2 size={64} className="text-emerald-500" />
                            <h3 className="text-2xl font-black text-emerald-950">No Pending Challans!</h3>
                            <p className="text-emerald-700/80 font-medium max-w-sm">Great job following traffic rules. There are no unpaid challans against this vehicle.</p>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                            className="space-y-6"
                        >
                            <div className="bg-amber-50 border border-amber-200 text-amber-900 p-4 rounded-2xl flex items-start gap-3">
                                <ShieldAlert size={20} className="shrink-0 mt-0.5 text-amber-600" />
                                <div>
                                    <h4 className="font-bold">Pending Violations Found</h4>
                                    <p className="text-sm font-medium opacity-80 mt-1">Please clear your dues to avoid legal complications or RC seizure.</p>
                                </div>
                            </div>

                            <div className="grid gap-4">
                                {challans?.map((challan) => (
                                    <motion.div
                                        key={challan.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-white rounded-3xl border border-gray-200 shadow-sm overflow-hidden flex flex-col sm:flex-row items-stretch"
                                    >
                                        <div className="p-6 sm:p-8 flex-1">
                                            <div className="flex items-center justify-between mb-4">
                                                <span className="font-bold text-red-600 bg-red-50 px-3 py-1 rounded-lg text-xs tracking-wider uppercase border border-red-100">Unpaid</span>
                                                <span className="text-xs font-bold text-gray-400 font-mono">{challan.id}</span>
                                            </div>
                                            <h3 className="text-xl font-black text-gray-900 mb-1">{challan.reason}</h3>
                                            <p className="text-gray-500 font-medium text-sm mb-4">📍 {challan.location}</p>
                                            <div className="text-3xl font-black text-gray-900 tracking-tight">
                                                ₹{challan.amount.toLocaleString('en-IN')}
                                            </div>
                                            <p className="text-xs font-bold text-gray-400 mt-2 uppercase tracking-wider">
                                                Issued on {new Date(challan.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                                            </p>
                                        </div>
                                        <div className="bg-gray-50/80 p-6 sm:p-8 border-t sm:border-t-0 sm:border-l border-gray-100 flex flex-col justify-center sm:min-w-[260px] gap-3">
                                            <button className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-xl font-black uppercase tracking-widest text-sm shadow-xl shadow-emerald-500/20 transition flex items-center justify-center gap-2 active:scale-[0.98]">
                                                <CreditCard size={18} />
                                                Pay Now
                                            </button>
                                            <p className="text-center text-[10px] font-bold text-gray-400 uppercase tracking-widest leading-relaxed">
                                                Powered by <span className="text-emerald-600">CivixPay Secure Gateway</span>
                                            </p>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Total Due Summary */}
                            {challans && challans.length > 1 && (
                                <div className="bg-gray-900 text-white p-6 rounded-2xl flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Due</p>
                                        <p className="text-3xl font-black tracking-tight mt-1">
                                            ₹{challans.reduce((s, c) => s + c.amount, 0).toLocaleString('en-IN')}
                                        </p>
                                    </div>
                                    <button className="bg-emerald-500 hover:bg-emerald-400 text-white px-8 py-3 rounded-xl font-black uppercase tracking-widest text-sm transition">
                                        Pay All
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default ChallanResults;
