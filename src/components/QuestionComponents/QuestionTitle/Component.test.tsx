import React from 'react'
import { render, screen } from '@testing-library/react'
import Component from './Component'

test('默认属性', () => {
    render(<Component />)
    const h = screen.getByText('一行标题')
    expect(h).toBeInTheDocument()
})

test('传入属性', () => {
    render(<Component level={2} text="hello" isCenter={true} />)
    const h = screen.getByText('hello')
    // <h2>
    expect(h.matches('h2')).toBeTruthy()
    const style = h.style
    expect(style.textAlign).toBe('center')
})
