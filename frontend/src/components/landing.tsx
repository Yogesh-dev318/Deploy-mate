import { CardTitle, CardDescription, CardHeader, CardContent, Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import axios from "axios"

const BACKEND_UPLOAD_URL = "http://localhost:3000";

export function Landing() {
  const [repoUrl, setRepoUrl] = useState("");
  const [uploadId, setUploadId] = useState("");
  const [uploading, setUploading] = useState(false);
  const [deployed, setDeployed] = useState(false);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-gray-100">
      <header className="w-full bg-gray-800 shadow-lg py-4">
        <div className="max-w-7xl mx-auto px-4 flex justify-center items-center">
          <h1 className="text-2xl font-bold text-indigo-400 tracking-wide">Deploy Mate</h1>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-grow p-6">
        <Card className="w-full max-w-md bg-gray-800 text-white rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
          <CardHeader className="pb-4">
            {/* <CardTitle className="text-3xl text-indigo-400 font-bold tracking-wide">Deploy Mate</CardTitle> */}
            <CardDescription className="text-sm text-gray-400">Easily deploy your GitHub repository</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="github-url" className="text-gray-300">GitHub Repository URL</Label>
                <Input 
                  className="bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors duration-300" 
                  onChange={(e) => setRepoUrl(e.target.value)} 
                  placeholder="https://github.com/username/repo" 
                />
              </div>
              <Button 
                onClick={async () => {
                  setUploading(true);
                  const res = await axios.post(`${BACKEND_UPLOAD_URL}/deploy`, { repoUrl });
                  setUploadId(res.data.id);
                  setUploading(false);
                  const interval = setInterval(async () => {
                    const response = await axios.get(`${BACKEND_UPLOAD_URL}/status?id=${res.data.id}`);
                    if (response.data.status === "deployed") {
                      clearInterval(interval);
                      setDeployed(true);
                    }
                  }, 3000);
                }} 
                disabled={uploadId !== "" || uploading} 
                className="w-full bg-indigo-600 hover:bg-indigo-500 rounded-md py-2 text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2" 
                type="submit"
              >
                {uploadId ? `Deploying (${uploadId})` : uploading ? "Uploading..." : "Upload"}
              </Button>
            </div>
          </CardContent>
        </Card>

        {deployed && (
          <Card className="w-full max-w-md mt-8 bg-gray-800 text-white rounded-lg shadow-xl transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <CardHeader className="pb-4">
              <CardTitle className="text-xl text-green-400 font-semibold">Deployment Status</CardTitle>
              <CardDescription className="text-sm text-gray-400">Your website is successfully deployed!</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <Label htmlFor="deployed-url" className="text-gray-300">Deployed URL</Label>
                <Input 
                  id="deployed-url" 
                  readOnly 
                  type="url" 
                  value={`http://${uploadId}.yogesh.com:3001/index.html`} 
                  className="bg-gray-700 border border-gray-600 text-gray-200 rounded-md focus:ring-2 focus:ring-green-500 transition-colors duration-300" 
                />
              </div>
              <br />
              <Button className="w-full bg-green-600 hover:bg-green-500 rounded-md py-2 text-lg font-medium transition-all duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2">
                <a href={`http://${uploadId}.yogesh.com/index.html`} target="_blank" rel="noopener noreferrer">
                  Visit Website
                </a>
              </Button>
            </CardContent>
          </Card>
        )}
      </main>


      <footer className="w-full bg-gray-800 text-gray-300 py-4 text-center">
        <p>© 2024 Deploy Mate. All rights reserved.</p>
      </footer>
    </div>
  );
}
