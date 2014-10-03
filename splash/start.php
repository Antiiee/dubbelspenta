<?php

include('config.php');

function get_started($db, $hashtag)
{
    $html = '<div class="instapost col-md-12">';
    $db_con = mysqli_connect($db['host'], $db['user'], $db['password'], $db['name']);
    $query = mysqli_query($db_con, "SELECT * FROM media WHERE hashtag='$hashtag' ORDER BY source_id DESC");
    if (mysqli_num_rows($query) > 0) {
        $count = 0;
        while ($post = mysqli_fetch_assoc($query)) 
        { 
            if ($post['type'] == 'photo')
            {
                $media = '<img id="' . $post["id"] . '" class="' . $post['source'] . '" src="' . $post['media_url'] . '" alt=""/>';
            } 
            else if ($post['media_url_https']!='') 
            {
                $media = '<video width="320" height="320" controls poster="'. $post['media_url'] . '">
                    <source src="'. $post['media_url_https'] . '" type="video/mp4">
                    Your browser does not support the video tag.
                    </video>';
            }
            $html .= $media;
            $count = $count . 1;
            if($count == 4)
            {
            	break;
            }
        }   
    }
    $html .= '</div>';
    mysqli_close($db_con);

    return $html;
}

echo get_started($db, $hashtag);

?>