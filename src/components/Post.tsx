import styles from './Post.module.css'
import { Comment } from './Comment'
import { Avatar } from './Avatar'
import { format, formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'

interface Author {
    avatarUrl: string,
    name: string,
    role: string
}

interface PostProps {
    author: Author,
    content: string,
    hashtags: string[],
    publishedAt: Date
}

export function Post ({ author, content, hashtags, publishedAt }: PostProps) {
    const [comments, setComments] = useState<string[]>([])
    const [newCommentText, setNewCommentText] = useState('')
    const publishedDateFormated = format(publishedAt, "d 'de' LLLL 'às' HH:mm'h'", {
        locale: ptBR
    })
    const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
        locale: ptBR,
        addSuffix: true
    })

    const newCommentIsEmpty = newCommentText.length == 0

    function handleCreateNewComment(event: FormEvent) {
        event.preventDefault()
        setComments([...comments, newCommentText])
        setNewCommentText('')
    }

    function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
        event.target.setCustomValidity('')
        setNewCommentText(event.target.value)
    }

    function deleteComment(commentToDelete: string) {
        const commentsWithoutDeletedOne = comments.filter(comment => {
            return comment !== commentToDelete
        })
        setComments(commentsWithoutDeletedOne)
    }

    function handleNewCommentOnInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
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