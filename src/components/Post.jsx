import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { useState } from 'react'

export function Post ({ author, content, hashtags, publishedAt }) {
    const [comments, setComments] = useState([])
    const [newCommentText, setNewCommentText] = useState('')
    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const newCommentIsEmpty = newCommentText.length == 0

    function handleCreateNewComment() {
        event.preventDefault()
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange() {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentOnInvalid() {
        event.target.setCustomValidity('Esse campo é obrigatório!')
    }

    return (
        <article className={styles.post}>
            <header>
                <div className={styles.author}>
                    <Avatar hasBorder src={author.avatarUrl} />
                    <div className={styles.authorInfo}>
                        <strong>{author.name}</strong>
                        <span>{author.role}</span>
                    </div>
                </div>
                <time title={publishedDateFormated} dateTime={publishedAt.toISOString()}>
                    {publishedDateRelativeToNow}
                </time>
            </header>
            <div className={styles.content}>
                <p>{content}</p>
                <p>
                    {hashtags.map((hashtag, index) => {
                        return (
                            <a href="#" key={index}>#{hashtag} {'\0'}</a>
                        )
                    })}
                </p>
            </div>
            <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
                <strong>Deixe seu feedback</strong>
                <textarea
                    placeholder='Deixe um comentário'
                    name='comment'
                    value={newCommentText}
                    onChange={handleNewCommentChange}
                    onInvalid={handleNewCommentOnInvalid}
                    required
                 />
                
                <footer>
                    <button type='submit' disabled={newCommentIsEmpty}>Publicar</button>
                </footer>
            </form>

            <div className={styles.commentList}>
                {comments.map((comment, index) => {
                    return (
                        <Comment 
                            key={`comment` + index} 
                            comment={comment}
                            onDeleteComment={deleteComment} />
                    )
                })}
            </div>
        </article>
    )
}