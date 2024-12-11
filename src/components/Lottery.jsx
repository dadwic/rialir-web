import React, { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';

export default function Lottery() {
  const [postUrl, setPostUrl] = useState('');
  const [comments, setComments] = useState([]);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchComments = async () => {
    setLoading(true);
    setWinner(null);
    try {
      // Fetch Media ID from Instagram URL
      const mediaResponse = await fetch(
        `https://graph.facebook.com/v15.0/instagram_oembed?url=${encodeURIComponent(
          postUrl
        )}&access_token=${process.env.NEXT_PUBLIC_META_ACCESS_TOKEN}`
      );

      if (!mediaResponse.ok) {
        throw new Error('Failed to fetch media ID');
      }

      const mediaData = await mediaResponse.json();
      const mediaId = mediaData.id;

      // Fetch Comments using Media ID
      const commentsResponse = await fetch(
        `https://graph.facebook.com/v15.0/${mediaId}/comments?access_token=${process.env.NEXT_PUBLIC_META_ACCESS_TOKEN}`
      );

      if (!commentsResponse.ok) {
        throw new Error('Failed to fetch comments');
      }

      const commentsData = await commentsResponse.json();
      setComments(commentsData.data);
    } catch (error) {
      console.error(error);
      alert('Error fetching comments. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const selectWinner = () => {
    if (comments.length === 0) {
      alert('No comments to select from!');
      return;
    }

    const randomIndex = Math.floor(Math.random() * comments.length);
    setWinner(comments[randomIndex]);
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ textAlign: 'center', marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          قرعه‌کشی کامنت‌ها
        </Typography>
        <TextField
          fullWidth
          label="آدرس پست"
          variant="outlined"
          value={postUrl}
          onChange={(e) => setPostUrl(e.target.value)}
          sx={{ marginBottom: 2 }}
        />
        <Button
          fullWidth
          size="large"
          variant="contained"
          color="primary"
          onClick={fetchComments}
          disabled={loading || !postUrl}
        >
          {loading ? <CircularProgress size={24} /> : 'درحال دریافت کامنت‌ها'}
        </Button>

        {comments.length > 0 && (
          <Typography sx={{ marginTop: 2 }}>
            تعداد کل کامنت‌ها: {comments.length}
          </Typography>
        )}

        {winner && (
          <Typography sx={{ marginTop: 2, fontWeight: 'bold', color: 'green' }}>
            برنده: {winner.username} ({winner.text})
          </Typography>
        )}

        <Button
          fullWidth
          size="large"
          variant="contained"
          color="secondary"
          onClick={selectWinner}
          sx={{ my: 2 }}
          disabled={comments.length === 0}
        >
          برنده را انتخاب کن!
        </Button>
        <Button
          fullWidth
          LinkComponent={Link}
          variant="outlined"
          size="large"
          href="/"
        >
          محاسبه گر قیمت نهایی کالا
        </Button>
      </Box>
    </Container>
  );
}
