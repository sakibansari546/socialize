import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import UploadIcon from '../assets/post.png';
import { toast } from 'sonner';
import { useSelector } from 'react-redux';

export function CreatePostDialogComponent({ open, onOpenChange }) {
  const inputRef = useRef();

  const { user } = useSelector(state => state.user)

  const [activeTab, setActiveTab] = useState('post');
  const [filePreview, setFilePreview] = useState(null); // State for storing file preview URL
  const [caption, setCaption] = useState('');
  const [file, setFile] = useState(null);


  const handlePostClick = () => {
    inputRef.current.click();
  };

  const handleFileChange = (event) => {
    const selectFile = event.target.files[0];

    if (activeTab === 'post') {
      // Post - Only allow images
      if (!selectFile?.type.startsWith('image/')) {
        toast.error('Please select an image file');
        inputRef.current.value = ''; // Reset input
      } else {
        const imageUrl = URL.createObjectURL(selectFile); // Create a preview URL for the image
        setFilePreview(imageUrl); // Set the image preview
        setFile(selectFile);
      }
    } else if (activeTab === 'reels') {
      // Reels - Only allow videos and check duration
      if (!selectFile?.type.startsWith('video/')) {
        localStorage.error('Please select a video file');
        inputRef.current.value = ''; // Reset input
      } else {
        const video = document.createElement('video');
        video.preload = 'metadata';
        video.onloadedmetadata = () => {
          window.URL.revokeObjectURL(video.src);
          if (video.duration > 90) {
            toast.error('Video must be less than or equal to 1.5 minutes (90 seconds)')
            inputRef.current.value = ''; // Reset input
          } else {
            const videoUrl = URL.createObjectURL(selectFile); // Create a preview URL for the video
            setFilePreview(videoUrl); // Set the video preview
            setFile(selectFile);
          }
        };
        video.src = URL.createObjectURL(selectFile);
      }
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('caption', caption);
    formData.append('user_id', user._id);
    formData.append('type', activeTab);
    
  };

  useEffect(() => {
    setCaption("")
    setFilePreview(null);
  }, [activeTab])

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>
            Choose between creating a regular post or a reels post.
          </DialogDescription>
        </DialogHeader>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="post">Post</TabsTrigger>
            <TabsTrigger value="reels">Reels</TabsTrigger>
          </TabsList>

          {/* Post Tab */}
          <TabsContent value="post">
            <form onSubmit={handleSubmit}>
              <div className='w-full flex items-center justify-center flex-col gap-4 mb-2'>
                {
                  filePreview ? (
                    <img className='w-full h-[65vw] object-cover' src={filePreview} alt="Preview" />
                  ) : (
                    <img className='w-[15vw] h-[15vw]' src={UploadIcon} alt="" />
                  )
                }
                <input
                  ref={inputRef}
                  className='hidden'
                  type="file"
                  accept="image/*" // Only allow images
                  onChange={handleFileChange}
                />
                <button type="button" onClick={handlePostClick} className='py-2 px-4 bg-gray-600 rounded-md text-white font-semibold'>
                  Upload Image
                </button>
              </div>

              {
                filePreview && (
                  <div className='flex mb-4'>
                    <img src={user.profile_img} className='w-8 h-8 object-cover rounded-full' alt="" />
                    <input onChange={(e) => setCaption(e.target.value)} type="text" className='w-full ml-3 outline-none' placeholder='Write a caption...' />
                  </div>
                )
              }

              <DialogFooter>
                {
                  filePreview && caption && <Button type="submit">Create Reels</Button>
                }
              </DialogFooter>
            </form>
          </TabsContent>

          {/* Reels Tab */}
          <TabsContent value="reels">
            <form onSubmit={handleSubmit}>
              <div className='w-full flex items-center justify-center flex-col gap-4 mb-4'>
                {filePreview ? (
                  <video
                    className='w-full h-[60vw] object-cover'
                    src={filePreview}
                    autoPlay
                  />
                ) : (
                  <img className='w-[15vw] h-[15vw]' src={UploadIcon} alt="" />
                )}
                <input
                  ref={inputRef}
                  className='hidden'
                  type="file"
                  accept="video/*" // Only allow videos
                  onChange={handleFileChange}
                />
                <button type="button" onClick={handlePostClick} className='py-2 px-4 bg-gray-600 rounded-md text-white font-semibold'>
                  Upload Video
                </button>
              </div>
              {
                filePreview && (
                  <div className='flex mb-4'>
                    <img src={user.profile_img} className='w-8 h-8 object-cover rounded-full' alt="" />
                    <input onChange={(e) => setCaption(e.target.value)} type="text" className='w-full ml-3 outline-none' placeholder='Write a caption...' />
                  </div>
                )
              }
              <DialogFooter>
                {
                  filePreview && caption && <Button type="submit">Create Reels</Button>
                }
              </DialogFooter>
            </form>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
