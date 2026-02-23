import React, { useState, useRef } from 'react';
import { 
  FileText, Download, Upload, Trash2, Shield, Search, 
  Filter, MoreVertical, CheckCircle2, Loader2 
} from 'lucide-react';
import { Card, CardBody, CardHeader } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Badge } from '../../components/ui/Badge';
import toast from 'react-hot-toast';

export const DocumentsPage: React.FC = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  
  // 1. Manage documents in a local state
  const [documents, setDocuments] = useState([
    { id: 1, name: 'Pitch_Deck_v2.pdf', type: 'PDF', size: '4.2 MB', date: 'Feb 10, 2026', status: 'Approved', category: 'Pitch' },
    { id: 2, name: 'Financial_Projections.xlsx', type: 'XLSX', size: '1.1 MB', date: 'Feb 15, 2026', status: 'Under Review', category: 'Finance' },
    { id: 3, name: 'Founder_Agreement_Signed.pdf', type: 'PDF', size: '850 KB', date: 'Feb 18, 2026', status: 'Verified', category: 'Legal' },
  ]);

  // 2. Handle the simulated upload
  const handleUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    const toastId = toast.loading(`Uploading ${file.name}...`);

    // Simulate network delay
    setTimeout(() => {
      const newDoc = {
        id: Date.now(),
        name: file.name,
        type: file.name.split('.').pop()?.toUpperCase() || 'FILE',
        size: (file.size / (1024 * 1024)).toFixed(2) + ' MB',
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        status: 'Draft',
        category: 'New Upload'
      };

      setDocuments([newDoc, ...documents]);
      setIsUploading(false);
      toast.success(`${file.name} uploaded to vault`, { id: toastId });
    }, 2000);
  };

  const deleteDocument = (id: number) => {
    setDocuments(documents.filter(doc => doc.id !== id));
    toast.success("Document removed");
  };

  const filteredDocs = documents.filter(doc => 
    doc.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1400px] mx-auto space-y-6 animate-fade-in">
      {/* Hidden File Input */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleUpload} 
        className="hidden" 
        accept=".pdf,.doc,.docx,.xlsx"
      />

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Startup Data Room</h1>
          <p className="text-gray-500">Securely host documents for investor due diligence.</p>
        </div>
        <div className="flex gap-3">
          <Button 
            variant="primary" 
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white"
          >
            {isUploading ? <Loader2 className="animate-spin" size={18} /> : <Upload size={18} />}
            {isUploading ? 'Uploading...' : 'Upload File'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar: Stats */}
        <div className="lg:col-span-1 space-y-6">
          <Card className="bg-gradient-to-br from-blue-600 to-indigo-700 text-white border-none shadow-lg">
            <CardBody className="p-6">
              <Shield className="mb-4 text-blue-200" size={32} />
              <h3 className="text-lg font-semibold">Bank-Level Security</h3>
              <p className="text-blue-100 text-sm mt-2 leading-relaxed">Encryption active.</p>
            </CardBody>
          </Card>
          
          <Card className="border-gray-100 shadow-sm">
            <CardBody className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500 font-medium">Space Used</span>
                <span className="font-bold text-blue-600">{documents.length * 2.5} MB / 100 MB</span>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full transition-all duration-500" 
                  style={{ width: `${(documents.length * 2.5)}%` }}
                />
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Main Content: Table */}
        <div className="lg:col-span-3">
          <Card className="border-gray-100 shadow-sm overflow-hidden">
            <CardHeader className="p-4 border-b bg-gray-50/50">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search files..." 
                  className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl outline-none text-sm"
                />
              </div>
            </CardHeader>
            <CardBody className="p-0">
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-gray-50/80 text-gray-500 text-[11px] uppercase tracking-wider font-bold">
                    <tr>
                      <th className="px-6 py-4">Document Name</th>
                      <th className="px-6 py-4">Status</th>
                      <th className="px-6 py-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredDocs.map((doc) => (
                      <tr key={doc.id} className="hover:bg-blue-50/30 transition-colors group">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="p-2.5 bg-gray-100 text-gray-500 rounded-lg group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                              <FileText size={20} />
                            </div>
                            <div>
                              <div className="font-bold text-gray-900 text-sm">{doc.name}</div>
                              <div className="text-[11px] text-gray-400">{doc.size} • {doc.date}</div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={doc.status === 'Approved' ? 'success' : 'secondary'}>
                            {doc.status}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex justify-end gap-1">
                            <button className="p-2 hover:text-blue-600 rounded-lg text-gray-400"><Download size={16} /></button>
                            <button 
                              onClick={() => deleteDocument(doc.id)}
                              className="p-2 hover:text-red-500 rounded-lg text-gray-400"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  );
};